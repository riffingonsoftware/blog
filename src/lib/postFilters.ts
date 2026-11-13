import { getCollection } from "astro:content";

/** Posts visible in this environment, newest first. Drafts appear only in local development. */
export async function getVisiblePosts() {
  const posts = await getCollection("posts", ({ data }) => import.meta.env.DEV || data.draft !== true);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
