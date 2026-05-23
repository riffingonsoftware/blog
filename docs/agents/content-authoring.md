# Content Authoring

## Post Location

Blog posts live in `src/content/posts/`, organized by year:

```
src/content/posts/
├── 2022/
├── 2023/
├── 2024/
├── 2025/
└── drafts/
```

## File Naming

- Post files: `YYYYMMDD.md` (e.g., `20250115.md`)
- Hero images: `YYYYMMDD-hero.[ext]` placed alongside the post file

## Frontmatter Schema

Enforced via Zod in `src/content/posts/config.ts`.

**Required fields:**

- `title` — Post title
- `description` — Short summary for SEO and listings
- `pubDate` — Publication date
- `tags` — Array of tag strings

**Optional fields:**

- `author` — Post author
- `draft` — Set to `true` to hide in production (visible in dev)
- `heroImage` — Path to hero image
- `heroImageAlt` — Alt text for hero image
- `updatedDate` — Date of last update
- `canonicalUrl` — Canonical URL if cross-posted

## Drafts

- Place draft posts in `src/content/posts/drafts/` or set `draft: true` in frontmatter
- Drafts are visible during `aubr dev` but excluded from production builds
