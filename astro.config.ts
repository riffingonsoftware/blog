import astroLayouts from "astro-layouts";
import codeTitle from "remark-code-title";
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	markdown: {
		extendDefaultPlugins: true,
		shikiConfig: {
			theme: "github-dark",
		},
		remarkPlugins: [
			[
				astroLayouts,
				{
					default: "@layouts/Layout.astro",
					posts: "@layouts/BlogLayout.astro",
				},
			],
			codeTitle,
		],
	},
	integrations: [mdx(), sitemap(), tailwind(),],
	site: 'https://riffingonsoftware.com',
});
