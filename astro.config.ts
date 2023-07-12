import { defineConfig } from "astro/config";
import codeTitle from "remark-code-title";
import compress from "astro-compress";
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [codeTitle],
  },
  // compress should be last
  integrations: [
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
      cacheDir: "./.cache/image",
      logLevel: "debug",
    }),
    mdx(),
    sitemap(),
    solidJs(),
    tailwind(),
    compress(),
  ],
  site: "https://riffingonsoftware.com",
});
