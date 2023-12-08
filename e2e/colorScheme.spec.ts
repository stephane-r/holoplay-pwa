import { expect, test } from "@playwright/test";

test("colorscheme interface", async ({ page }) => {
  await page.goto("localhost:3000");

  await expect(
    page.locator("html[data-mantine-color-scheme=light]"),
  ).toBeVisible();

  await page.getByRole("button", { name: "Toggle color scheme" }).click();

  await expect(
    page.locator("html[data-mantine-color-scheme=light]"),
  ).not.toBeVisible();
  await expect(
    page.locator("html[data-mantine-color-scheme=dark]"),
  ).toBeVisible();
});
