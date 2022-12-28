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
  integrations: [compress(), mdx(), sitemap(), tailwind()],
  site: 'https://riffingonsoftware.com',
});