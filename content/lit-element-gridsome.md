---
title: Using Lit Element with Gridsome
description: How to use Lit Element web components in a Gridsome project
---

[Lit element](https://lit-element.polymer-project.org/) is a useful library for creating web components. [Gridsome](https://gridsome.org/) is a [jamstack framework](https://jamstack.org/), a static site generator, for Vue.js.

Incorporating the two of these shouldn't be troublesome, though I found some issues with one of my sites when I tried this. So let us begin.

Install your web component.

```shell
npm i @lanthierlabs/nutrient-label
```

For yarn:

```shell
yarn add @lanthierlabs/nutrient-label
```

Now use it somewhere. I put it in my markdown which I have configured with `@gridsome/source-filesystem`:

```html
<nutrient-label title="Ratio Keto Bar (both)" servingsize="1 bar" calories="220" fat="17" saturatedfat="5" carbohydrates="5" protein="12"></nutrient-label>
```

After adding an import statement everything seemed to work fine until I tried to build for production. I hit the dreaded error: **window is not defined**. This was happening inside of the lit element code that my web component was referencing. Note I did not provide the import statement due to programmers who are just looking for the solutions to their problems via code snippets.

Solution for **window is not defined** lit element with gridsome:

```javascript
export default function(Vue, { router, head, isClient }) {
  if (isClient) {
    const NutrientLabel = require("@lanthierlabs/nutrient-label").default;
    Vue.component("nutrient-label", NutrientLabel);  
  }
  ...
```

**Why?**

This error occurs when gridsome encounters the `window` variable in a node context while it is prerendering your code through a `gridsome build`. If we import the webcomponent inside of the `if (isClient)` condition, gridsome build will not encounter the variable. 