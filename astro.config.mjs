// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";
import codeTitle from "remark-code-title";

// https://astro.build/config
export default defineConfig({
  site: "https://riffingonsoftware.com",
  image: {
    dangerouslyProcessSVG: true,
  },
  markdown: {
    remarkPlugins: [codeTitle],
  },
  integrations: [
    sitemap(),
    compress({
      // CSSO drops Tailwind's range media queries; Vite already minifies CSS.
      CSS: false,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
