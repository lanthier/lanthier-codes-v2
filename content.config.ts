import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    /**
     * This is collection for Alex Lanthier's portfolio site
     * Create `content.config.ts` in project root to overwrite this
     */
    content: defineCollection({
      type: 'page',
      source: '**',
      schema: z.object({
        layout: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        date: z.string().optional(),
        seo: z.object({
          title: z.string().optional(),
          description: z.string().optional(),
          keywords: z.array(z.string()).optional(),
          author: z.string().optional(),
          image: z.string().optional(),
          url: z.string().optional(),
        }).optional(),
      }),
    }),
  },
})
