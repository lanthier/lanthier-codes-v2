<script setup lang="ts">
const appConfig = useAppConfig();
const route = useRoute();

// Static navigation links
const navigation = [
  { title: 'Home', path: '/' },
  { title: 'Projects', path: '/projects' },
  { title: 'Blog', path: '/blog' },
  { title: 'Writing', path: '/writing' },
];

// Function to check if a link is active
const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/';
  }
  return route.path.startsWith(path);
};
</script>

<template>
  <div class="fixed top-2 sm:top-4 mx-auto left-1/2 transform -translate-x-1/2 z-10">
    <nav class="relative flex gap-1.5 items-center justify-between backdrop-blur-sm rounded-full px-2 py-2 sm:px-4 shadow-lg">
      <div class="relative">
        <ul class="isolate min-w-0 flex items-center gap-x-1">
          <li v-for="link in navigation" :key="link.path">
            <a 
              :href="link.path" 
              :class="[
                'group relative w-full flex items-center gap-1.5 font-medium text-md transition-all duration-200 ease-in-out rounded-lg px-3 py-2',
                isActive(link.path) 
                  ? 'bg-peach/40 text-highlighted' 
                  : 'text-highlighted hover:bg-peach/20 hover:text-highlighted'
              ]"
            >
              {{ link.title }}
            </a>
          </li>
          <ColorModeSwitch />
        </ul>
      </div>
    </nav>
  </div>  
</template>
