# TODO — Riffing on Software (Astro + Tailwind v4)

Context
- Tailwind v4 zero-config with CSS-based plugins and theming via `@theme` tokens is in use.
- DaisyUI has been removed; a light component layer in `src/styles/global.css` provides `.btn`, `.badge`, `.divider`, `.navbar`, `.menu`, `.card`, `.footer`.
- Prettier is configured (Astro + Tailwind plugins). Posts are excluded from formatting.
- Dates are unified via `src/lib/date.ts`.

Guiding choices (do not regress)
- Keep Tailwind v4 zero-config. Prefer `@theme` tokens and `@plugin` in CSS over a `tailwind.config.*` file unless a hard requirement emerges.
- Keep the two dark blues: page `#0c1425` (token: `--color-page` / `bg-page`) and sidebar `#081019` (token: `--color-sidebar` / `bg-sidebar`).
- Keep cards clickable via stretched link, but preserve tag links. Description must not block overlay click.

High-priority
1) Accessibility polish
   - Header mobile menu: add `aria-controls="sidebar-panel"` and toggle `aria-expanded` true/false as the drawer opens/closes. Path: `src/components/Header.astro` + `src/components/Sidebar.astro`.
   - Active nav state: set `aria-current="page"` on the current sidebar link. Path: `src/components/SidebarMenu.astro`.
   - Card overlay focus: ensure stretched link gets a visible focus style (`focus-visible:outline outline-2 outline-white/40`). Path: `src/components/HorizontalCard.astro` and/or component CSS.
   - Image alt text: for listing cards, use a meaningful fallback `alt={imgAlt || title}` (currently empty). Path: `src/components/HorizontalCard.astro` (Image component).

2) SEO/meta quick wins
   - Add RSS discovery: `<link rel="alternate" type="application/rss+xml" href="/rss.xml" title="Riffing on Software">`. Path: `src/components/Head.astro`.
   - Add `og:site_name` ("Riffing on Software"). Path: `src/components/Head.astro`.
   - Optional: Add JSON‑LD BlogPosting to post pages (title, pubDate, updatedDate, url, tags). Path: `src/layouts/PostLayout.astro`.

3) CI/typechecking
   - Scripts: add `"typecheck": "astro check"` and update build to `"build": "astro check && astro build"`.
   - CI: add GitHub Action to run `pnpm install`, `pnpm typecheck`, `pnpm build`, and `pnpm format:check` on PRs.
   - Docs: note `pnpm approve-builds` for sharp/esbuild in CI.

Theming and CSS (idiomatic Tailwind v4)
- DONE: Use `@theme` tokens in `src/styles/global.css` to define `--color-*`, `--radius`, `--shadow-card`.
- TODO: Replace any remaining hard-coded `#0c1425` / `#081019` with token utilities (`bg-page`, `bg-sidebar`, `text-text`, `border-border`) where feasible.
  - Acceptance: `rg -n "#0c1425|#081019"` in `src/**` returns none in class contexts.
- Keep `@plugin "@tailwindcss/typography"` declared in CSS (v4-native). No `tailwind.config.*` unless a non-CSS plugin/config is truly needed.
- Small correctness fixes (applied): ensure CSS variables use `--color-*` names consistently.
  - `.btn-ghost:hover` uses `var(--color-page)`.
  - `.divider` uses `background: var(--color-border); opacity: .25;` (hex tokens don’t work with `rgb(var(--...)/alpha)`).

Performance
- 404 video: add `muted playsinline` and, if available, a small `poster` to avoid blank flashes. Path: `src/pages/404.astro`.
- Bundle analysis (optional): if needed, add `rollup-plugin-visualizer` via `vite.plugins` in `astro.config.mjs` under a dev flag rather than relying on `--verbose`.

DX / linting
- Prettier is in place. Consider light ESLint if desired:
  - Packages: `eslint`, `eslint-plugin-astro`, `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`.
  - Script: `pnpm lint` to run ESLint over `src/**`.
- Node version: add an `.nvmrc` (and optionally `engines.node` in `package.json`) to document the supported Node version.

Content & features (optional polish)
- Reading time: add a lightweight utility to compute reading time from rendered HTML or raw Markdown and display on post pages. Path: `src/layouts/PostLayout.astro` (near dates).
- Search: consider `pagefind` (static-friendly) for client-side search; add a small input in the sidebar or header.

Type safety / schema
- Prefer inference over explicit casts in `.astro` files: when defining `interface Props { ... }`, destructure directly from `Astro.props` without `as Props` (`const { ... } = Astro.props;`). Update occurrences in layouts/components accordingly.
- Make `updatedDate` consistent with `pubDate`: change schema to `updatedDate: z.coerce.date().optional()` to avoid string/date drift and simplify formatting.
- Optional override: add `canonicalUrl: z.string().url().optional()` to the post schema. Plumb through `[slug].astro` to `PostLayout` (or straight to `Head.astro`) and render `<link rel="canonical">` using `canonicalUrl ?? Astro.url`.
- Strongly type `page` in `PostListingLayout.astro` instead of `any`: declare a minimal structural type that matches Astro paginate output for our usage, e.g.:
  - `type Page<T> = { data: T[]; url: { prev?: string; next?: string } }` and use `Page<CollectionEntry<'posts'>>`.
  - Then `interface Props { page: Page<CollectionEntry<'posts'>>; tag?: string; title: string }` and destructure from `Astro.props` (no `as`).
  - Acceptance: no `any` in `PostListingLayout.astro`; IDE shows typed `page.data` and `page.url.prev/next`.

Decisions on other suggestions (do not implement unless requirements change)
- Tailwind config file: NOT needed with v4 zero-config. Our tokens and plugins live in CSS, which is the current best practice.
- Alphabetical Tailwind class ordering: we use `prettier-plugin-tailwindcss` (Tailwind’s canonical order). Switching to purely alphabetical is not recommended as it can affect utility semantics and readability.
- Dark mode toggle: possible follow-up; current site is intentionally dark. A toggle could switch `data-theme` and token set if requested.
- Structured data & robots.txt: structured data is a good follow-up; robots.txt is already present and can be refined if SEO goals require it.

References
- Tailwind v4 theming with `@theme` tokens and CSS plugins is the recommended approach. No `content` globs or config file required for our current needs.
