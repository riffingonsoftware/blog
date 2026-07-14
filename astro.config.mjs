// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://riffingonsoftware.com",
  image: {
    dangerouslyProcessSVG: true,
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
