import { defineCollection, z } from "astro:content";

const work = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    client: z.string().optional(),
    role: z.string().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    publishDate: z.coerce.date(),
    draft: z.boolean().optional().default(false),
    tags: z.array(z.string()).optional(),
    link: z.string().optional(),
    heroImage: z.string().optional()
  })
});

const insights = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().optional().default(false),
    tags: z.array(z.string()).optional(),
    heroImage: z.string().optional()
  })
});

export const collections = { work, insights };
