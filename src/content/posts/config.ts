import { z, defineCollection } from "astro:content";

const postSchema = z.object({
  description: z.string(),
  draft: z.boolean().optional(),
  heroImage: z.string().optional(),
  heroImageAlt: z.string().optional(),
  pubDate: z.coerce.date(),
  tags: z.array(z.string()),
  title: z.string(),
  updatedDate: z.string().optional(),
});

export type PostSchema = z.infer<typeof postSchema>;

const postCollection = defineCollection({
  schema: postSchema,
  type: "content",
});

export const collections = {
  posts: postCollection,
};
