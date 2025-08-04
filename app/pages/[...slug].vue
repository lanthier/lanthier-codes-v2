<script setup lang="ts">
/**
 * Document driven is removed in Content v3.
 * This page is a simple/full-feature replacement of document driven.
 */
import type { LayoutKey } from '#build/types/layouts'

const route = useRoute()

const { data: page } = await useAsyncData(`page-${route.params.slug}`, () => {
  return queryCollection('content').path(route.path).first()
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

if (!page.value) {
  throw createError({
    status: 404,
    statusText: 'Page not found',
  })
}

// Only pass valid SEO fields to useSeoMeta
const seoData = page.value?.seo ? {
  title: page.value.seo.title,
  description: page.value.seo.description,
  author: page.value.seo.author,
  image: page.value.seo.image,
  url: page.value.seo.url,
} : {}

useSeoMeta(seoData)

// Computed property for layout name
const layoutName = computed(() => {
  return (page.value?.layout as LayoutKey) || 'default'
})
</script>

<template>
  <NuxtLayout :name="layoutName" class="bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Show date for blog posts -->
      <time 
        v-if="page?.date && page?.path?.startsWith('/blog/')" 
        :datetime="page.date"
        class="block text-sm text-gray-500 dark:text-gray-400 mb-6"
      >
        {{ formatDate(page.date) }}
      </time>
      
      <ContentRenderer
        v-if="page"
        :value="page"
        class="prose dark:prose-invert prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 prose-pre:overflow-x-auto prose-pre:max-w-full prose-img:max-w-full prose-img:h-auto prose-pre:text-sm sm:prose-pre:text-base"
      />
    </div>
      <!-- Social Links -->
  <div class="flex justify-center gap-4 width-10 text-center text-blue-600 dark:text-blue">
    <a href="https://github.com/Lanthier" class="hover:text-blue-700 dark:hover:text-blue-hover transition-colors">
      <Icon name="i-simple-icons-github" class="size-6" />
    </a>
    <a href="https://linkedin.com/in/alexander-lanthier" class="hover:text-blue-700 dark:hover:text-blue-hover transition-colors">
      <Icon name="i-simple-icons-linkedin" class="size-6" />
    </a>
    <a href="https://bsky.app/profile/alexlanthier.bsky.social" class="hover:text-blue-700 dark:hover:text-blue-hover transition-colors">
      <Icon name="i-simple-icons-bluesky" class="size-6" />
    </a>
    <a href="https://lanthier.substack.com" class="hover:text-blue-700 dark:hover:text-blue-hover transition-colors">
      <Icon name="i-simple-icons-substack" class="size-6" />
    </a>
  </div>
  </NuxtLayout>
</template>
