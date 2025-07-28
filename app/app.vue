<script setup lang="ts">
const { cover } = useAppConfig()

useSeoMeta({
  ogImage: cover,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="sm:pt-6 sm:pb-10">
    <Html lang="en" />
    <NuxtLoadingIndicator />
    <Navbar />
    <div class="flex justify-center items-center min-h-screen pt-20">
      <NuxtPage />
    </div>
  </div>
</template>
