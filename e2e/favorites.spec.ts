import { expect, test } from "@playwright/test";

import { navigateTo, search, selectedInstance } from "./utils";

test("save card in favorites", async ({ page }) => {
  await page.goto("localhost:3000");
  await selectedInstance(page);

  // Trending is currently dominated entirely by livestreams (whatever's
  // hyped at the moment), which never count as a "video" below — a search
  // result for a well-established query is a much more stable source of a
  // plain, non-live video.
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await search(page, "Eminem");

  const card = page
    .getByRole("list", { name: "Search result list Eminem" })
    .getByRole("listitem")
    .first();
  await expect(card).toBeVisible();
  await card.getByRole("button", { name: "Add to favorite" }).click();
  await expect(
    page.getByRole("button", { name: "Remove from favorite" }),
  ).toBeVisible();

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
