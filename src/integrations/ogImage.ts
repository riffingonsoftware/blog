import type {AstroIntegration, RouteData} from "astro";
import * as child from 'child_process';
import puppeteer from "puppeteer";
import {fileURLToPath} from "url";

export default function ogImage(): AstroIntegration {
    return {
        name: "og-image", hooks: {
            'astro:build:done': async (options: { dir: URL; routes: RouteData[], pages: { pathname: string }[] }) => {
                const astroRun = child.spawn('astro', ['dev']);
                try {
                    let astroStarted = false;
                    astroRun.stdout.on('data', (data) => {
                        if (astroStarted) {
                            return;
                        }

                        if (data.includes("Watching src/content/ for changes")) {
                            // TODO: This is a hack to make sure astro has started. Probably a better way to do this.
                            astroStarted = true;
                        }
                    });
                    console.log("Waiting for astro to start...");
                    while (!astroStarted) {
                        // sleep until astro has started
                        await new Promise((resolve) => setTimeout(resolve, 1000));
                    }
                    console.log("Astro started!");
                    const browser = await puppeteer.launch({
                        headless: "new",
                    });
                    try {
                        const browserPage = await browser.newPage();
                        for (let page of options.pages) {
                            if (page.pathname === "") {
                                continue;
                            }

                            if (page.pathname.endsWith("/")) {
                                page.pathname = page.pathname.slice(0, -1);
                            }

                            const pageUrl = new URL(page.pathname, 'http://localhost:4321/');
                            console.log(`Generating og image for ${page.pathname}`);
                            await browserPage.goto(pageUrl.href);
                            await browserPage.waitForNetworkIdle();
                            await browserPage.setViewport({
                                width: 1200, height: 627,
                            });
                            await browserPage.screenshot({
                                path: fileURLToPath(new URL(`images/${page.pathname.split('/').join('-').split(' ').join('-') + '.webp'}`, options.dir)),
                                type: 'webp',
                            });
                        }
                    } finally {
                        await browser.close();
                    }
                } finally {
                    astroRun.kill('SIGTERM');
                }
            }
        }
    };
}