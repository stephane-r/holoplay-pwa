import { expect, test } from "@playwright/test";

import { search, selectedInstance } from "./utils";

test.describe.serial("player", () => {
  test.skip("play video", async ({ page }) => {
    await page.goto("localhost:3000");

    await selectedInstance(page, "invidious.projectsegfau.lt");

    await page.reload();

    await search(page, "Eminem lyric");

    await page
      .getByRole("list", { name: "Search result list Eminem lyric" })
      .getByRole("listitem")
      .first()
      .click();

    await expect(page.getByRole("dialog", { name: "Player" })).toBeVisible({
      timeout: 15000,
    });

    // Ne fonctionne pas

    await expect(
      page.getByRole("status", { name: "Player loading" }),
    ).toBeVisible({
      timeout: 15000,
    });
  });
});
