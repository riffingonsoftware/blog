/** Extract the last segment of a content collection slug (e.g. "2025/20250115" → "20250115"). */
export function getSlug(slug: string): string {
  return slug.split("/").pop() || slug;
}
