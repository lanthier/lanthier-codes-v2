---
title: Blog
description: Thoughts on design, development, and everything in between
---

<div class="max-w-4xl mx-auto">
  <div class="mb-12">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Blog</h1>
    <p class="text-lg text-gray-600 dark:text-gray-300">A place for my development thoughts</p>
  </div>

  <div class="grid gap-8">
    <article v-for="post in $page.posts" :key="post._path" class="group">
      <NuxtLink :to="post._path" class="block">
        <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
          <div class="mb-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {{ post.title }}
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {{ new Date(post.date || post._file).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) }}
            </p>
          </div>
          
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ post.description || 'No description available.' }}
          </p>
          
          <div class="mt-4 flex items-center text-sm text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
            Read more
            <Icon name="i-lucide-arrow-right" class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </NuxtLink>
    </article>
  </div>
</div> 