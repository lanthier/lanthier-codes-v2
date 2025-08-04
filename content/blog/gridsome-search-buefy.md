---
title: Gridsome Search with Buefy and Flexsearch
description: How to set up Flexsearch with Buefy's autocomplete in Gridsome
date: 2020-07-27T05:00:00.000-05:00
seo:
  title: "Gridsome Flexsearch and Buefy Autocomplete - Complete Guide"
  description: "Hooking up the gridsome flexsearch plugin to a b-autocomplete in Buefy. Learn how to implement search functionality in your Gridsome site."
  keywords: ["gridsome", "buefy", "flexsearch", "vue", "javascript", "search", "autocomplete"]
  author: "Alex Lanthier"
  image: "/gridsome-search-buefy.jpg"
  url: "/gridsome-search-buefy"
---

Hooking up flexsearch in your gridsome site can really take your website to the next level. Here I will show you how you can hook up flexsearch to your `<b-autocomplete>` elements. We will start with basics on hooking up the gridsome flexsearch plugin then move into a specific implementation with Buefy.

## Setup Buefy

The [documentation](https://buefy.org/documentation/start) will explain more in detail about getting started on Buefy. Here I will do a basic setup.

Install Buefy with yarn. If you using npm, use `npm install buefy`

```shell
yarn add buefy
```

Tell Vue to use Buefy. I am just going to use the entirety of Buefy, refer to the link I provided above for a modular setup.

```javascript
import Buefy from "buefy";
import "~/assets/style/index.scss";

export default function(Vue, { router, head, isClient }) {
  head.link.push({
    rel: "stylesheet",
    href: "https://use.fontawesome.com/releases/v5.2.0/css/all.css"
  });
  Vue.use(Buefy);
}
```

Notice that we also pushed a style sheet to the head element of our html. We do this because Buefy uses font awesome. This is how you can integrate stylesheets with gridsome. Another way you can do this is [overriding the index.html](https://gridsome.org/docs/overriding-index/) and providing the stylesheet in that manner.

## Setup the flexsearch plugin

I recommend you refer to the actual [documentation](https://gridsome.org/plugins/gridsome-plugin-flexsearch) for anything beyond our basic setup.

```shell
yarn add gridsome-plugin-flexsearch
```

```javascript
//gridsome.config.js
module.exports = {
  //...
  plugins: [
    //...
    {
      use: 'gridsome-plugin-flexsearch',
      options: {
        searchFields: ['title'],
        collections: [
          {
            typeName: 'Post',
            indexType: 'Post',
            fields: ['title', 'description', 'path']
          }
        ]
      }
    }
  ]
}
```

`typeName` is the type we are indexing for search. In our case we have an existing type called Post in our project.

`searchFields` are the fields that are searchable and what will be the actual indexed field in the search.

`fields` are what will actually come back on each object in your search result.

For more detailed information, refer to the link I posted above.

## Make an autocomplete search field utilizing Buefy and flexsearch

Now that both flexsearch and Buefy are setup, lets make our autocomplete search field that searches for our posts. The example is as minimal as I can make it to demonstrate the base functionality. Keep this in mind as there are many useful and recommended properties on `<b-autocomplete>`.

```html
<template>
  <section class="container">
    <b-field label="Search Reviews">
      <b-autocomplete
        v-model="query"
        :data="searchResultsByTitle"
        icon="magnify"
        @select="listResults">
        <template slot="empty">No results found</template>
      </b-autocomplete>
    </b-field>
    <PostCard v-for="result in searchResultsToRender" :key="result.id" :post="result.node" />
  </section>
</template>
```

```javascript
import PostCard from "~/components/PostCard.vue";

export default {
  components: {
    PostCard
  },
  computed: {
    searchResults () {
      const searchTerm = this.query
      if (searchTerm.length < 3) return []
      return this.$search.search({ query: searchTerm, limit: 5 })
    },
    searchResultsByTitle () {
      return this.searchResults.map(result => result.title)
    }
  },
  data: () => ({
    query: "",
    searchResultsToRender: []
  }),
  methods: {
    listResults() {
      this.searchResultsToRender = this.searchResults
    }
  }
}
```

We can actually call the search using `$search.search`. Since eventually we use the search results to also populate the autocomplete dropdown, we are going to limit our query to 5 Posts.

The `v-model` binding is a two-way binding to what is actually typed in the input. This will be stored in the `query` property.

The `data` property consists of the actual autocomplete results.

`searchResults` refers to the actual results from the search. I made this a computed for reactivity.

`searchResultsByTitle` is a computed that plucks the title field off of the actual search results. This is how we are populating the autocomplete dropdown.

`searchResultsToRender` is a nice to have I threw in this sample. We can render our search results however we'd like. I populate this property on the `selected` event. With this list, I then render the `<PostCard>`s with the results.

That's all! This is a base setup and I'd highly recommend you read through the documentation links I've provided in regards to setting up your projects. I created this post because I couldn't find anything from a quick search on how to actually hook up this particular setup. Hope you found it useful! 