<script setup lang="ts">
const route = useRoute();
const { data: posts } = await useAsyncData(route.path, () =>
  queryCollection("content")
    .order("date", "DESC")
    .select("title", "description", "date", "path")
    .where('path', 'LIKE', '/blog/%')
    .all()
)

// Set page metadata
useHead({
  title: "Blog - Alex Lanthier",
  meta: [
    {
      name: "description",
      content: "A space for my software development thoughts",
    },
  ],
});
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <div class="mb-12">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Blog
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        A space for my software development thoughts
      </p>
    </div>

    <div
      v-if="posts && posts.length > 0"
      class="grid gap-6 md:grid-cols-2 lg:grid-cols-1"
    >
      <article v-for="post in posts" :key="post.path" class="group">
        <NuxtLink :to="post.path" class="block">
          <div
            class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600"
          >
            <h2
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3"
            >
              {{ post.title }}
            </h2>
            <p
              class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4"
            >
              {{ post.description || "No description available." }}
            </p>
            <div
              class="flex items-center text-sm text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
            >
              Read more
              <Icon
                name="i-lucide-arrow-right"
                class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>
    <div v-else class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400">No blog posts found.</p>
    </div>
  </div>
</template>