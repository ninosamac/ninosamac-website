import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/recipes' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string(),
      servings: z.number().int().positive(),
      prepMinutes: z.number().int().nonnegative(),
      cookMinutes: z.number().int().nonnegative(),
      ingredients: z.array(z.string()).min(1),
      steps: z.array(z.string()).min(1),
      tags: z.array(z.string()).default([]),
      hero: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog, recipes };
