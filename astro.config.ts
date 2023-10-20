import {defineConfig} from "astro/config";
import codeTitle from "remark-code-title";
import compress from "astro-compress";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import solidJs from "@astrojs/solid-js";
import ogImage from "./src/integrations/OgImage.ts";

// https://astro.build/config
export default defineConfig({
    markdown: {
        remarkPlugins: [codeTitle],
    },
    // ogImage doesn't work on Netlify. Don't feel like troubleshooting, just copied the output from a previous run into images. Could regenerate locally.
    // compress should be last
    integrations: [mdx(), sitemap(), solidJs(), tailwind(), /*ogImage(),*/ compress(),],
    site: "https://riffingonsoftware.com",
});
