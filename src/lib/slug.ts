/** Extract the last segment of a content collection id (e.g. "2025/20250115" → "20250115"). */
export function getSlug(id: string): string {
  return id.split("/").pop() || id;
}

export function postPath(id: string): string {
  return `/posts/${getSlug(id)}/`;
}

export function tagPath(tag: string): string {
  return `/posts/${encodeURIComponent(tag)}/1/`;
}
