// type: module
import Parser from 'rss-parser';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { altSources, mainstreamFeeds } = JSON.parse(await fs.readFile(path.join(__dirname, './sources.json'), 'utf8'));
const KW = JSON.parse(await fs.readFile(path.join(__dirname, './keywords.json'), 'utf8'));

// Tunables
const SINCE_HOURS = 96;
const MAX_OUTPUT = 100;
const MAINSTREAM_WINDOW_HOURS = 72;
const TITLE_SIMILARITY_THRESHOLD = 0.42; // Jaccard on tokens; tweak
const UNDERCOVERAGE_BONUS = 20;          // added if mainstream silent
const OVERCOVERAGE_PENALTY = 20;         // subtracted if mainstream saturated
const CHILE_BOOST = 12;
const GLOBAL_SOUTH_BOOST = 10;
const US_CRIT_BOOST = 10;
const CORP_WATCH_BOOST = 14;
const THINKPIECE_BOOST = 8;
const WIRE_PENALTY = 12;

const STOP = new Set([
  'the','a','an','and','or','of','to','in','on','for','by','with','from','at','as','is','are','was','were','be',
  'this','that','it','its','their','his','her','they','them','you','your','our','we','but','not','into','over',
  'after','before','than','then','up','down','out','about'
]);

function toDate(x){ try{ return x ? new Date(x) : null; } catch { return null; } }
function hoursAgo(d){ return (Date.now()-d.getTime())/36e5; }
function txt(s){ return (s||'').toLowerCase(); }
function sniff(item){
  const t = txt(item.title);
  const s = txt(item.contentSnippet || item.content || '');
  return t + ' ' + s;
}
function tokens(str){
  return new Set(str.replace(/[^a-z0-9\s]/g,' ')
    .split(/\s+/).filter(w => w && !STOP.has(w) && w.length>2));
}
function jaccard(aSet, bSet){
  let inter = 0;
  for (const w of aSet) if (bSet.has(w)) inter++;
  const union = aSet.size + bSet.size - inter;
  return union ? inter/union : 0;
}
function anyMatch(str, arr){ const L = txt(str); return arr.some(k => L.includes(k)); }
function scoreRecency(pub){
  if(!pub) return 0;
  const age = Math.max(0, SINCE_HOURS - hoursAgo(pub));
  return age;
}
function detectCategories(text){
  const tags = [];
  if (anyMatch(text, KW.protestTerms)) tags.push('protest');
  if (anyMatch(text, KW.usCriticalPolitics)) tags.push('us-critical-politics');
  if (anyMatch(text, KW.corpRiskTerms) || anyMatch(text, KW.corporateWatchlist)) tags.push('corporate-scrutiny');
  if (anyMatch(text, KW.thinkpieceMarkers)) tags.push('thinkpiece');
  if (anyMatch(text, KW.geoChile)) tags.push('chile');
  if (anyMatch(text, KW.geoGlobalSouth)) tags.push('global-south');
  return tags;
}

async function fetchFeeds(parser, list, windowHours = SINCE_HOURS){
  const cutoff = Date.now() - windowHours*36e5;
  const out = [];
  await Promise.all(list.map(async src => {
    try{
      const feed = await parser.parseURL(src.url);
      for(const it of feed.items ?? []){
        const pub = toDate(it.isoDate || it.pubDate);
        if (!pub || pub.getTime() < cutoff) continue;
        out.push({ src, it, pub, text: sniff(it), titleTokens: tokens(txt(it.title||'')) });
      }
    }catch(e){ console.error(`[rss] ${src.id} failed: ${e.message}`); }
  }));
  return out;
}

function mainstreamOverlapScore(itemTextTokens, mainstreamIndex){
  // Find max similarity against mainstream titles to estimate coverage
  let maxSim = 0;
  for(const m of mainstreamIndex){
    const sim = jaccard(itemTextTokens, m.titleTokens);
    if (sim > maxSim) maxSim = sim;
    if (maxSim >= 0.9) break;
  }
  return maxSim;
}

function computeScore(record){
  const { it, src, pub, text } = record;
  let s = 0;

  // Base: recency + source weight
  s += scoreRecency(pub) * (src.weight || 1);

  // Buckets
  const cats = detectCategories(text);
  if (cats.includes('protest')) s += 20;
  if (cats.includes('us-critical-politics')) s += US_CRIT_BOOST;
  if (cats.includes('corporate-scrutiny')) s += CORP_WATCH_BOOST;
  if (cats.includes('thinkpiece')) s += THINKPIECE_BOOST;

  // Geography bias
  if (cats.includes('chile')) s += CHILE_BOOST;
  if (cats.includes('global-south')) s += GLOBAL_SOUTH_BOOST;

  // Corporate watchlist x risk terms combo bonus
  if (anyMatch(text, KW.corporateWatchlist) && anyMatch(text, KW.corpRiskTerms)) s += 12;

  // Penalize obvious PR/wire clones
  if (anyMatch(text, KW.suppressionTerms)) s -= WIRE_PENALTY;

  // Tiny multimedia bump
  if (it.enclosure && (it.enclosure.url || it.enclosure.length)) s += 4;

  return { score: s, cats };
}

async function main(){
  const parser = new Parser({ timeout: 15000, headers: { 'User-Agent': 'nuxt-static-news/2.0 (+https://example.com)' } });

  // Pull feeds
  const alt = await fetchFeeds(parser, altSources, SINCE_HOURS);
  const mainstream = await fetchFeeds(parser, mainstreamFeeds, MAINSTREAM_WINDOW_HOURS);

  // Build mainstream index (titles only is enough)
  const mainstreamIndex = mainstream.map(m => ({ titleTokens: m.titleTokens }));

  // Score + under-coverage adjustment
  const scored = alt.map(rec => {
    const base = computeScore(rec);
    const sim = mainstreamOverlapScore(rec.titleTokens, mainstreamIndex);

    let rarityBonus = 0;
    if (sim < TITLE_SIMILARITY_THRESHOLD) rarityBonus += UNDERCOVERAGE_BONUS; // mainstream silent → boost
    else rarityBonus -= OVERCOVERAGE_PENALTY * sim; // more similar → more penalty

    // Final score
    const finalScore = base.score + rarityBonus;

    return {
      id: rec.it.guid || rec.it.link || (rec.src.id + ':' + (rec.it.title||'').slice(0,60)),
      title: rec.it.title || '(untitled)',
      link: rec.it.link,
      summary: rec.it.contentSnippet || rec.it.content || '',
      publishedAt: rec.pub.toISOString(),
      sourceId: rec.src.id,
      sourceRegion: rec.src.region,
      categories: Array.from(new Set(base.cats)), // de-dupe tags
      rarityScore: Number((1 - Math.min(1, Math.max(0, sim))).toFixed(2)),
      _score: finalScore
    };
  });

  // De-dupe by URL/guid; keep highest score then most recent
  const byKey = new Map();
  for (const r of scored){
    const key = r.link || r.id;
    const prev = byKey.get(key);
    if (!prev) byKey.set(key, r);
    else if (r._score > prev._score || (r._score === prev._score && r.publishedAt > prev.publishedAt)) byKey.set(key, r);
  }

  const items = Array.from(byKey.values())
    .sort((a,b) => b._score - a._score || (new Date(b.publishedAt) - new Date(a.publishedAt)))
    .slice(0, MAX_OUTPUT)
    .map(({ _score, ...rest }) => rest);

  // Write JSON Feed 1.1
  await fs.mkdir(path.join(__dirname, '../public'), { recursive: true });
  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Under-Covered: US + Global South (Chile-boosted)',
    home_page_url: '/',
    feed_url: '/feed.json',
    description: 'Critical politics, corporate scrutiny, movements, and deep analysis. Boost what mainstream ignores.',
    items: items.map((it) => ({
      id: it.id,
      url: it.link,
      title: it.title,
      content_text: it.summary,
      date_published: it.publishedAt,
      authors: [{ name: it.sourceId }],
      tags: [it.sourceRegion, ...it.categories]
    }))
  };
  await fs.writeFile(path.join(__dirname, '../public/feed.json'), JSON.stringify(feed, null, 2));

  // OPML for your reader
  const opml = `<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
  <head><title>Alt Sources + Mainstream (reference)</title></head>
  <body>
    <outline text="Alt Sources">
      ${altSources.map(s => `<outline text="${s.id}" type="rss" xmlUrl="${s.url}" />`).join('\n      ')}
    </outline>
    <outline text="Mainstream Reference">
      ${mainstreamFeeds.map(s => `<outline text="${s.id}" type="rss" xmlUrl="${s.url}" />`).join('\n      ')}
    </outline>
  </body>
</opml>`;
  await fs.writeFile(path.join(__dirname, '../public/feeds.opml'), opml, 'utf8');

  console.log(`[ok] feed.json (${items.length}) · feeds.opml (${altSources.length + mainstreamFeeds.length})`);
}

main()
.then(() => process.exit(0))
.catch(e => { console.error(e); process.exit(1); });
