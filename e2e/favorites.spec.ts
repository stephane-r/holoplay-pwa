import { expect, test } from "@playwright/test";

import { navigateTo, selectedInstance } from "./utils";

test("save card in favorites", async ({ page }) => {
  await page.goto("localhost:3000");
  await selectedInstance(page);

  // Go to Trending page
  await page.getByRole("button", { name: "Trending" }).click();
  await expect(page.getByRole("heading", { name: "Trending" })).toBeVisible();
  await expect(page.getByRole("list", { name: "Trending" })).toBeVisible({
    timeout: 10000,
  });

  // Toggle favorite button — skip live streams specifically (Trending
  // currently tends to surface one at the very top): they don't count as
  // a "video" below, and this test wants a plain video.
  const nonLiveCard = page
    .getByRole("list", { name: "Trending" })
    .getByRole("listitem")
    .filter({ hasNotText: "LIVE" })
    .first();
  await expect(nonLiveCard).toBeVisible();
  await nonLiveCard.getByRole("button", { name: "Add to favorite" }).click();
  await expect(
    page.getByRole("button", { name: "Remove from favorite" }),
  ).toBeVisible();

  // Verify notification visibility
  await expect(page.getByRole("alert")).toContainText(/Added to favorites/);

  // Go to Favorites page
  await navigateTo(page, "Favorites", "Favorites");

  // Check tab navigation
  await expect(page.getByRole("tablist").getByRole("tab")).toHaveCount(5);
  // Check default tab is All
  await expect(
    page.getByRole("tablist").getByRole("tab", {
      selected: true,
    }),
  ).toContainText(/All/);

  // Check data-list
  await expect(
    page.getByRole("list", { name: "Favorites list" }).getByRole("listitem"),
  ).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Remove from favorite" }),
  ).toBeVisible();

  // Switch tab to Videos
  await page.getByRole("tablist").getByRole("tab", { name: "Videos" }).click();
  await expect(
    page.getByRole("tablist").getByRole("tab", {
      selected: true,
    }),
  ).toContainText(/Videos/);

  // Check data-list displayed
  await expect(
    page
      .getByRole("list", { name: "Favorites videos list" })
      .getByRole("listitem"),
  ).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Remove from favorite" }),
  ).toBeVisible();
});
