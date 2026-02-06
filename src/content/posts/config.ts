import { z, defineCollection, type SchemaContext } from "astro:content";

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
      canonicalUrl: z.string().url().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.heroImage && (!data.heroImageAlt || data.heroImageAlt.trim().length === 0)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "heroImageAlt is required when heroImage is set",
          path: ["heroImageAlt"],
        });
      }
    });

export type PostSchema = z.infer<ReturnType<typeof postSchema>>;

const postCollection = defineCollection({
  schema: postSchema,
  type: "content",
});

export const collections = {
    posts: postCollection,
};
