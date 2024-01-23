import { expect, test } from "@playwright/test";

test("default blocks are visible", async ({ page }) => {
  await page.goto("localhost:3000");

  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await expect(page.getByTestId("recently-play-empty")).toBeVisible();
  await expect(page.getByTestId("recent-favorites")).toBeVisible();
  await expect(
    page.getByRole("list", { name: "Moods & genres" }).getByRole("listitem"),
  ).toHaveCount(113);
});
