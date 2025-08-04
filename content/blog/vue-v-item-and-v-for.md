---
title: Vue v-item and v-for
description: Understanding Vue's v-item directive and its relationship with v-for
date: 2020-02-13T06:00.000-05:00
seo:
  title: "Vue v-item and v-for - Complete Guide to List Rendering"
  description: "Master Vue's v-item directive and v-for for efficient list rendering. Learn best practices for dynamic content generation and component iteration in Vue applications."
  keywords: ["vue", "v-for", "v-item", "javascript", "frontend", "vue components", "list rendering"]
  author: "Alex Lanthier"
  image: "/vue-v-item-v-for.jpg"
  url: "/vue-v-item-and-v-for"
---

While iterating through lists in Vue.js, you may have come across a certain annoyance before:

**The 'variableName' variable inside 'v-for' directive should be replaced with a computed property that returns filtered array instead. You should not mix 'v-for' with 'v-if'.**

I have ran into this issue many times, whether it was attempting to render search results from an API or menu items. In fact this was common for me whenever I wanted to dynamically setup my routes in navigation and I needed to hide certain routes that existed on my vue router. The proper fix for this is to use the v-for on a `<template>` element.

**Before:**

```html
<BlogCard v-for="blog in blogs" v-if="blog.isDeleted" :key="blog.name" />
```

**After:**

```html
<template v-for="blog in blogs">
  <BlogCard v-if="blog.isDeleted" :key="blog.name" />
</template>
```

The reason why we are using vue templates are because they are not rendered in the DOM. For additional information on conditional rendering, see the [Conditional Rendering](https://vuejs.org/v2/guide/conditional.html) docs on the Vue.js site. 