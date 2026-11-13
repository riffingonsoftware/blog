import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../config";
import { getVisiblePosts } from "../lib/postFilters";
import { postPath } from "../lib/slug";

export async function GET(context) {
  const publishedPosts = await getVisiblePosts();
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: publishedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: postPath(post.id),
    })),
  });
}
