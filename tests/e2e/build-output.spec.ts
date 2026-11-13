import fs from "node:fs";
import { expect, test } from "@playwright/test";

// Unreferenced images leak drafts: dist/og/ is public even when no page links to it.
test("ships exactly the social images that pages reference", () => {
  const pages = fs.globSync("dist/**/*.html");
  const referenced = new Set(
    pages.flatMap((page) =>
      [...fs.readFileSync(page, "utf8").matchAll(/https:\/\/riffingonsoftware\.com\/og\/([^"\s>]+)/g)].map(([, name]) =>
        decodeURIComponent(name),
      ),
    ),
  );

  expect(fs.readdirSync("dist/og").sort()).toEqual([...referenced].sort());
});
