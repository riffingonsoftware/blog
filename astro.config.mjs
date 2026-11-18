// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import compress from "astro-compress";
import fs from "node:fs";

/** @type {URL} */
let root;
/** @type {string} */
let trailingSlash;

// https://astro.build/config
export default defineConfig({
  site: "https://riffingonsoftware.com",
  trailingSlash: "always",
  image: {
    dangerouslyProcessSVG: true,
  },
  integrations: [
    {
      name: "sitemap",
      hooks: {
        "astro:config:done": ({ config }) => {
          root = new URL(config.base.replace(/\/?$/, "/"), config.site);
          trailingSlash = config.trailingSlash;
        },
        "astro:build:done": ({ dir, pages }) => {
          const loc = (/** @type {string} */ path) => {
            const href = new URL(trailingSlash === "never" ? path.replace(/\/$/, "") : path, root).href;
            return `<loc>${href.replaceAll("&", "&amp;")}</loc>`;
          };
          const urls = pages
            .map(({ pathname }) => pathname.replace(/^\//, ""))
            .filter((path) => !/^(404|500)\/?$/.test(path))
            .map((path) => `<url>${loc(path)}</url>`)
            .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
          const xml = '<?xml version="1.0" encoding="UTF-8"?>';
          const ns = 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
          fs.writeFileSync(new URL("sitemap-0.xml", dir), `${xml}<urlset ${ns}>${urls.join("")}</urlset>`);
          fs.writeFileSync(
            new URL("sitemap-index.xml", dir),
            `${xml}<sitemapindex ${ns}><sitemap>${loc("sitemap-0.xml")}</sitemap></sitemapindex>`,
          );
        },
      },
    },
    compress({
      // CSSO drops Tailwind's range media queries; Vite already minifies CSS.
      CSS: false,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
