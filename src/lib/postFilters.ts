import type { CollectionEntry } from "astro:content";

/**
 * Returns true when a post should be visible in the current environment.
 * Drafts are included during local development but excluded from production builds.
 */
export const includeVisiblePosts = ({ data }: CollectionEntry<"posts">) => {
  return import.meta.env.DEV || data.draft !== true;
};
