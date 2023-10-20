import type {AstroIntegration, RouteData} from 'astro';
import * as child from 'child_process';
import puppeteer from 'puppeteer';
import {fileURLToPath} from 'url';

export default function ogImage(): AstroIntegration {
    return {
        name: 'og-image', hooks: {
            'astro:build:done': async (options: { dir: URL; routes: RouteData[], pages: { pathname: string }[] }) => {
                const astroRun = child.spawn('astro', ['dev']);
                try {
                    let astroStarted = false;
                    astroRun.stdout.on('data', (data) => {
                        if (astroStarted) {
                            return;
                        }

                        if (data.includes('Watching src/content/ for changes')) {
                            // TODO: This is a hack to make sure astro has started. Probably a better way to do this.
                            astroStarted = true;
                        }
                    });
                    while (!astroStarted) {
                        // sleep until astro has started
                        await new Promise((resolve) => setTimeout(resolve, 1000));
                    }
                    const browser = await puppeteer.launch({
                        headless: 'new',
                    });
                    try {
                        const browserPage = await browser.newPage();

                        const pageUrl = new URL('OgImage', 'http://localhost:4321/');
                        console.log('Generating Open Graph image...');
                        await browserPage.goto(pageUrl.href);
                        await browserPage.waitForNetworkIdle();
                        await browserPage.setViewport({
                            width: 1200, height: 630,
                        });
                        await browserPage.screenshot({
                            path: fileURLToPath(new URL('images/riffingonsoftware-og.webp', options.dir)), type: 'webp',
                        });
                        console.log('Successfully generated Open Graph image.');
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