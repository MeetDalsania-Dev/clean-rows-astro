import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    author: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { posts };
