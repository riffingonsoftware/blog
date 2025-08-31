# Open Graph Image and LinkedIn Preview – Test Guide

This repo generates per‑post Open Graph images at build time and sets correct meta tags for LinkedIn (and other platforms). Use this checklist to validate locally and in Cloudflare Pages previews without making a public post.

## 1) Generate OG images locally

- Run: `pnpm generate:og`
- Output: JPEGs at `public/og/<slug>.jpg`, 1200×627.
- Verify a couple images exist: `ls -la public/og | head`
- Optional: verify dimensions (macOS):
  - `sips -g pixelWidth -g pixelHeight public/og/<slug>.jpg`
  - Expect `pixelWidth: 1200`, `pixelHeight: 627`.

## 2) Verify meta tags locally

- Start dev server: `pnpm dev`
- Open a post page, e.g., `http://localhost:4321/posts/<slug>`
- View source in the browser and look for these tags:
  - `og:title`, `og:description`, `og:url`, `og:site_name`
  - `og:type="article"` (posts only)
  - `og:image` (absolute URL to `/og/<slug>.jpg`)
  - `og:image:width=1200`, `og:image:height=627`, `og:image:type=image/jpeg`, `og:image:alt`
  - `article:published_time`, `article:modified_time` (if present), `article:tag` (one per tag)

## 3) Preview deployment (Cloudflare Pages)

- Open a PR so Cloudflare Pages creates a preview URL.
- Example: `https://<project>-<hash>.pages.dev/posts/<slug>`
- Paste this URL into LinkedIn Post Inspector:
  - https://www.linkedin.com/post-inspector/inspect/
  - Click “Scrape Again” after changes.
- Confirm the preview shows your generated image and correct text.

## 4) Direct asset check

- Open the OG image URL directly (from the `og:image` tag), e.g., `https://<project>-<hash>.pages.dev/og/<slug>.jpg`
- It should load quickly and be a JPEG.
- Headers check (optional): `curl -I 'https://.../og/<slug>.jpg'` → `Content-Type: image/jpeg`.

## 5) Cross‑network spot checks (optional)

- OpenGraph (quick preview): https://www.opengraph.xyz/
- Meta Sharing Debugger (FB): https://developers.facebook.com/tools/debug/
- These help confirm general OG correctness beyond LinkedIn.

## 6) Troubleshooting

- Image not updating in LinkedIn:
  - Use Post Inspector “Scrape Again” to clear LinkedIn’s cache.
  - Ensure the filename/URL changed after design updates (cache busting via build hash if necessary).
- Image missing or wrong ratio:
  - Confirm `public/og/<slug>.jpg` exists and is 1200×627.
  - Make sure the page’s `og:image` points to `/og/<slug>.jpg` (absolute URL in the meta tag).
- Wrong type on non‑post pages:
  - Posts use `og:type=article`; others use `og:type=website`.
- Node version on Cloudflare Pages:
  - Project settings → Environment variables → set `NODE_VERSION` to `20` or `22` to match `.nvmrc`.

## 7) Notes

- Generator stack: Sharp renders SVG → JPEG (quality ~85). No extra deps.
- Title wrapping is heuristic; extremely long titles clamp to 2–3 lines with ellipsis behavior approximated by wrapping.
- You can override an image per post in the future (e.g., `ogImage`), but by default every post has a generated, brand‑consistent image.
