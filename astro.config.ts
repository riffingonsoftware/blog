import { defineConfig } from 'astro/config';
import codeTitle from "remark-code-title";
import compress from 'astro-compress';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	markdown: {
		extendDefaultPlugins: true,
		remarkPlugins: [
			codeTitle,
		],
	},
	// compress should be last
	integrations: [mdx(), sitemap(), tailwind(), compress(),],
	site: 'https://riffingonsoftware.com',
});