import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../config";
import {getCollection} from "astro:content";

export async function GET(context) {
  const publishedPosts = await getCollection("posts", ({ data }) => {
    return data.draft !== true;
  });
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: publishedPosts.map(((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.slug}`,
    }))),
  });
}
