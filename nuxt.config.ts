import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
  ],

  css: ['assets/css/main.css'],
  colorMode: { classSuffix: '' },

  // Static site generation
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/']
    }
  },

  // GitHub Pages configuration
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/lanthier-codes-v2/' : '/',
    buildAssetsDir: '/_nuxt/',
  },

  content: {
    build: {
      markdown: {
        highlight: {
          // See the available themes on https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-theme
          theme: {
            dark: 'github-dark',
            default: 'github-light',
          },
        },
      },
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-02-19',

  vite: { 
    plugins: [tailwindcss()] 
  },
})