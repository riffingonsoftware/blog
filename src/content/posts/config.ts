import { defineCollection, type SchemaContext } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const postSchema = ({ image }: SchemaContext) =>
  z
    .object({
      author: z.string().optional(),
      description: z.string(),
      draft: z.boolean().optional(),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
      pubDate: z.coerce.date(),
      tags: z.array(z.string()),
      title: z.string(),
      updatedDate: z.coerce.date().optional(),
      canonicalUrl: z.url().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.heroImage && (!data.heroImageAlt || data.heroImageAlt.trim().length === 0)) {
        ctx.addIssue({
          code: "custom",
          message: "heroImageAlt is required when heroImage is set",
          path: ["heroImageAlt"],
        });
      }
    });

const postCollection = defineCollection({
  loader: glob({
    base: "./src/content/posts",
    pattern: "**/[^_]*.{md,mdx}",
  }),
  schema: postSchema,
});

export const collections = {
  posts: postCollection,
};
