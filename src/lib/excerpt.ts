export function excerptFromMarkdown(md: string, maxLen = 160): string {
  if (!md) return "";
  // Strip code fences/blocks
  let text = md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    // Strip images/links: ![alt](url) or [text](url)
    .replace(/!\[[^\]]*\]\([^\)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^\)]*\)/g, " ")
    // Strip headings/markup
    .replace(/^#+\s+/gm, "")
    .replace(/[*_>#~`]/g, " ")
    .replace(/\r?\n+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

  if (text.length <= maxLen) return text;
  const slice = text.slice(0, maxLen);
  const lastSpace = slice.lastIndexOf(" ");
  return (lastSpace > 80 ? slice.slice(0, lastSpace) : slice).trim() + "…";
}
