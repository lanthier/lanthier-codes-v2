<script setup lang="ts">
import { computed } from 'vue';

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

const { data } = await useFetch<FeedData>('/feed.json', { key: 'feed' });

const items = computed(() => {
  return data.value?.items || [];
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
