<script setup lang="ts">
interface FeedItem {
  id: string;
  title: string;
  url: string;
  content_text: string;
  date_published: string;
  authors?: Array<{ name: string }>;
  tags: string[];
}

interface FeedData {
  items: FeedItem[];
}

// Use useAsyncData which is better for static generation
const { data } = await useAsyncData('feed', async () => {
  try {
    return await $fetch<FeedData>('/feed.json');
  } catch (error) {
    console.warn('Feed not available during build, will fetch at runtime');
    return { items: [] };
  }
});

const items = computed(() => {
  return data.value?.items || [];
});

// Set page metadata for social media
useHead({
  title: 'My Under-Covered News Feed',
  meta: [
    { name: 'description', content: 'Critical politics, corporate scrutiny, movements, and deep analysis.' },
    
    // Open Graph / Facebook
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'Under-Covered Wire - Critical News & Analysis' },
    { property: 'og:description', content: 'Critical politics, corporate scrutiny, movements, and deep analysis. Boost what mainstream ignores.' },
    { property: 'og:image', content: '/me-coffee.png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:url', content: 'https://lanthier.codes/news' },
    
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Under-Covered Wire - Critical News & Analysis' },
    { name: 'twitter:description', content: 'Critical politics, corporate scrutiny, movements, and deep analysis. Boost what mainstream ignores.' },
    { name: 'twitter:image', content: '/me-coffee.png' },
    
    // Additional meta
    { name: 'keywords', content: 'news, politics, corporate scrutiny, global south, chile, critical analysis, under-covered news' }
  ]
});
</script>

<template>
  <main class="max-w-3xl mx-auto p-4 space-y-4">
    <header class="space-y-2">
      <h1 class="text-2xl font-bold">Under-Covered Wire</h1>
      <p class="text-xs opacity-70">Built at deploy · <a class="underline" href="/feeds.opml">OPML</a></p>
    </header>

    <ul class="space-y-3">
      <li v-for="item in items" :key="item.id" class="p-4 rounded-2xl shadow border">
        <div class="text-xs opacity-60">
          {{ new Date(item.date_published || Date.now()).toLocaleString() }}
          · {{ item.authors?.[0]?.name }}
          · <span v-for="t in item.tags" :key="t" class="mr-1">#{{ t }}</span>
        </div>
        <a class="block text-lg font-semibold underline" :href="item.url" target="_blank" rel="noopener">
          {{ item.title }}
        </a>
        <p class="text-sm mt-1 line-clamp-3">{{ item.content_text }}</p>
      </li>
    </ul>
  </main>
</template>

<style>
.line-clamp-3 { display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
</style>
