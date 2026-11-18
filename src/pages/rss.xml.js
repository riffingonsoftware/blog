import { SITE_TITLE, SITE_DESCRIPTION } from "../config";
import { getVisiblePosts } from "../lib/postFilters";
import { postPath } from "../lib/slug";

const escapeXML = (s) =>
  s.replace(/[&<>'"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&apos;", '"': "&quot;" })[c]);

export async function GET(context) {
  const items = (await getVisiblePosts()).map((post) => {
    const link = escapeXML(new URL(postPath(post.id), context.site).href);
    return (
      `<item><title>${escapeXML(post.data.title)}</title><link>${link}</link>` +
      `<guid isPermaLink="true">${link}</guid><description>${escapeXML(post.data.description)}</description>` +
      `<pubDate>${post.data.pubDate.toUTCString()}</pubDate></item>`
    );
  });
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXML(SITE_TITLE)}</title>` +
    `<description>${escapeXML(SITE_DESCRIPTION)}</description><link>${escapeXML(new URL("/", context.site).href)}</link>` +
    `${items.join("")}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
