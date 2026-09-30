import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Fields match keystatic.config.ts. Keystatic writes posts as .mdoc files and
// authors as .yaml files; dates arrive as YAML dates, so they are coerced.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      draft: z.boolean().default(false),
      seoTitle: z.string().optional().nullable(),
      description: z.string(),
      publishedDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional().nullable(),
      author: reference('authors').optional().nullable(),
      category: z.enum(['prospect-lists', 'buying-b2b-data', 'data-quality', 'outbound']).default('prospect-lists'),
      coverImage: image().optional().nullable(),
      coverAlt: z.string().optional().nullable(),
      faqs: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
    }),
});

const authors = defineCollection({
  loader: glob({ pattern: '*.{yaml,yml}', base: './src/content/authors' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string().optional().nullable(),
      linkedin: z.union([z.string().url(), z.literal('')]).optional().nullable(),
      bio: z.string().optional().nullable(),
      photo: image().optional().nullable(),
    }),
});

export const collections = { posts, authors };
