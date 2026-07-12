import { expect, test, type Locator } from "@playwright/test";

async function boundingBox(locator: Locator) {
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  return box!;
}

test("keeps the sidebar beside the page content on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  const sidebar = page.locator("#sidebar-panel");
  const pageContent = page.locator("#page-content");

  await expect(page.locator("#site-header")).toBeHidden();
  await expect(sidebar).toBeVisible();

  const sidebarBox = await boundingBox(sidebar);
  const contentBox = await boundingBox(pageContent);

  expect(sidebarBox.width).toBeGreaterThan(200);
  expect(contentBox.x).toBeGreaterThanOrEqual(sidebarBox.x + sidebarBox.width - 1);
  expect(contentBox.width).toBeGreaterThan(0);
});

test("keeps the sidebar off-canvas until opened on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const header = page.locator("#site-header");
  const menuButton = page.locator("#menu-button");
  const sidebar = page.locator("#sidebar-panel");
  const pageContent = page.locator("#page-content");

  await expect(header).toBeVisible();
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");

  const closedSidebarBox = await boundingBox(sidebar);
  const contentBox = await boundingBox(pageContent);
  expect(closedSidebarBox.x + closedSidebarBox.width).toBeLessThanOrEqual(1);
  expect(contentBox.x).toBeLessThanOrEqual(1);
  expect(contentBox.width).toBeGreaterThanOrEqual(389);

  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(sidebar).toHaveAttribute("role", "dialog");
  await expect.poll(async () => (await boundingBox(sidebar)).x).toBeGreaterThanOrEqual(-1);

  await page.keyboard.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(sidebar).not.toHaveAttribute("role", "dialog");
  await expect
    .poll(async () => {
      const box = await boundingBox(sidebar);
      return box.x + box.width;
    })
    .toBeLessThanOrEqual(1);
});
