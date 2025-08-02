---
title: Vue Composition API
description: Understanding and using the Vue Composition API in Vue 2
date: 2024-01-15
seo:
  title: "Vue Composition API - Complete Guide for Vue 2"
  description: "Learn how to use the Vue Composition API in Vue 2 applications. Understand the benefits, installation process, and practical examples for better code organization."
  keywords: ["vue", "composition api", "vue 2", "javascript", "frontend", "web development"]
  author: "Alex Lanthier"
  image: "/vue-composition-api.jpg"
  url: "/vue-composition-api"
---

## What is the Vue Composition API?

According the [Vue Composition API website](https://composition-api.vuejs.org/#summary), it is a "set of additive, function-based APIs that allow flexible composition of component logic."

In my words, the Vue Composition API is an API that allows the usage of Vue Component functionality without the necesity of that functionality living inside of a Vue Component. You can use `Watch` and `computed` in composable functionality that utilizes the Vue Composition API without the need for that code to be inside of a Vue Component.

*This article is an attempt to simplify the official [Vue Composition API article](https://composition-api.vuejs.org/), and how we can use it in Vue 2.*

## Why the Vue Composition API?

**The 3 Limitations of Vue Components**

**1. Readability as components grow** - The logical concerns for a component become distributed throughout the component so there is a lot of scrolling up and down the code to understand its functionality. Consider this photo found on the Vue Composition API site:

![Vue Component Code Concern Distribution](https://user-images.githubusercontent.com/499550/62783021-7ce24400-ba89-11e9-9dd3-36f4f6b1fae2.png)

This fragmentation makes it take a long time to understand and maintain complex components. This fragmentation is forced by the Vue Component structure. The vue composition API aids in this structure so we can group each functional concern together, such as this example:

![Vue Compisition API vs Component Functionality Distribution](https://user-images.githubusercontent.com/499550/62783026-810e6180-ba89-11e9-8774-e7771c8095d6.png)

**2. Code reuse patterns have drawbacks** - The Vue Composition API can reuse logical functionality that needs to be reactive in viewmodels. The composition API can be useful when there is DOM representation for data or when there is more than 1 DOM representation for the logic.

**3. Limited TypeScript support**

## How to Use the Vue Composition API in Vue 2

You do not need to go through the trouble of upgrading your website to Vue 3 to use the Vue Composition API that comes with it. There's [a package](https://github.com/LinusBorg/composition-api-demos/tree/develop/src/composables) that allows us to use the API separate from the rest of Vue 3. It is important to note the caveats in the readme file at the base of the linked repo.

**Step 1: Install**

```bash
yarn add @vue/composition-api
```

**Step 2: Bump minor Vue versions**

```json
"dependencies": {
  "vue": "^2.6.12" // Used to be "vue": "^2.6.10",
  ...
},
"devDependencies": {
  "vue-template-compiler": "^2.6.12" // If you use a template compiler, update this to match your vue version
}
```

**Step 3: Hook up Vue Composition API for Vue 2**

Unfortunately, it isn't as easy as importing the package, there are still a few known issues around getting Vue to play nicely with the API.

Create a file that will hold your composition API import. You need to do this because you need to call Vue.use(VueCompositionApi) prior to importing anything that uses the API. [Better explanation here](https://stackoverflow.com/questions/61885716/uncaught-error-vue-composition-api-must-call-vue-useplugin-before-using-any/61907559#61907559)

```javascript
import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
 
Vue.use(VueCompositionApi);
```

After creating that intial file that holds the API import, you can import the rest of your modules in your application entry point. **Note that you need to import this file before importing anything else in your Vue application**.

```javascript
import Vue from "vue";
import "./composition-api";...
```

**Now you're ready to use it**

```javascript
import { ref, computed } from "@vue/composition-api";
import { TaskData, TaskStatus } from "@/models/task-data";
 
const tasks = ref([]);
 
const add = (task: TaskData) => {
  tasks.value.push(task);
};
 
const remove = (taskId: string) => {
  tasks.value = tasks.value.filter((task: TaskData) => task.id !== taskId);
};
 
const removeAll = () => {
  tasks.value = [];
};
 
const updateTaskStatus = (taskId: string, status: TaskStatus) => {
  const task = tasks.value.find((task: TaskData) => task.id === taskId);
 
  if (task) {
    task.propsData.status = status;
  }
};
 
const hasTasks = computed(() => tasks.value.length > 0);
const taskCount = computed(() => tasks.value.length);
 
const taskTray = {
  tasks,
  add,
  remove,
  removeAll,
  updateTaskStatus,
  hasTasks,
  taskCount
};
 
export { taskTray };
```

## Additional resources

Official Vue introduction to the Vue Composition API: [https://composition-api.vuejs.org/](https://composition-api.vuejs.org/)

Many composable examples: [https://github.com/LinusBorg/composition-api-demos/tree/develop/src/composables](https://github.com/LinusBorg/composition-api-demos/tree/develop/src/composables) 