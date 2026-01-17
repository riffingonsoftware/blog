// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";
import codeTitle from "remark-code-title";

// https://astro.build/config
export default defineConfig({
  site: "https://riffingonsoftware.com",
  markdown: {
    remarkPlugins: [codeTitle],
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("kitted-privacy"),
    }),
    compress(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
