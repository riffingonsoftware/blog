# Code Conventions

## Formatting (Prettier)

Configured in `.prettierrc`:

- Print width: 120
- Semicolons: required
- Quotes: double
- Trailing commas: all
- Indentation: 2 spaces
- Plugins: prettier-plugin-astro, prettier-plugin-tailwindcss

Run `aubr format` to auto-format. Run `aubr format:check` to verify.

## TypeScript

- Strict mode enabled (extends `astro/tsconfigs/strict`)
- Use explicit `type` keyword for type-only imports
- Interfaces and types: PascalCase (e.g., `Props`, `PostSchema`)

## File Naming

- Astro components: `PascalCase.astro` (e.g., `PostLayout.astro`)
- Utility modules: `camelCase.ts` (e.g., `readingTime.ts`)
- Pages/routes: lowercase with `[param].astro` for dynamic routes

## Astro Components

- Define prop types as TypeScript interfaces in the component frontmatter
- Destructure props at the top of the frontmatter block

## CSS

- Tailwind CSS v4 with Vite plugin
- Custom theme variables defined as CSS custom properties (e.g., `--color-page`)
- Use `@layer components` for reusable component classes
