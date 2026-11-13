# Riffing on Software

## Development

Use the Bun and Node versions pinned in `mise.toml`. Bun manages dependencies
and runs scripts; Astro, Playwright, and image generation use Node.

```sh
bun install --frozen-lockfile
bun run dev
bun run build
bun run format:check
```

The build checks formatting and Astro, generates social images, builds the
site, and runs browser tests at desktop and mobile widths.

Cloudflare Pages needs `SKIP_DEPENDENCY_INSTALL=true`, build command
`sh scripts/cloudflare-build.sh`, and output directory `dist`. The script runs
the Bun pinned by `packageManager` in `package.json`; Node is pinned in
`.node-version`.

## The Blog

Welcome to the home of my blog. We'll see if I do anything with it or even stick to it, but I've been thinking about doing this long enough.

I've used the excellent [Astro Modern Personal Website Template](https://github.com/manuelernestog/astro-modern-personal-website) as the basis for this site. Any problems herein are doubtless my fault.

### LinkedIn Requirements

They can be found [here](https://www.linkedin.com/help/linkedin/answer/a521928/making-your-website-shareable-on-linkedin?lang=en-us&intendedLocale=en), but specifically for og:image:

- Max file size: 5 MB
- Minimum image dimensions: 1200 (w) x 627 (h) pixels
- Recommended ratio: 1.91:1
- File types: JPG, PNG, or GIF
