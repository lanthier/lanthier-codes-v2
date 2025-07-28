declare module '#app' {
  interface NuxtApp {
    $content: any
  }
}

declare module '@nuxt/schema' {
  interface RuntimeConfig {
    $content: any
  }
}

export {} 