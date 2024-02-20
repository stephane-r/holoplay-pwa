import { expect, test } from "@playwright/test";

import {
  listVisibility,
  search,
  selectSearchType,
  selectedInstance,
} from "./utils";

test.describe.serial("search", () => {
  test("search an artist", async ({ page }) => {
    await page.goto("localhost:3000");

    await selectedInstance(page, "invidious.projectsegfau.lt");

    await search(page, "Eminem");
    await search(page, "Dubstep");

    // Focus input text
    await page.getByPlaceholder("What do you want hear today?").fill("");

    // Check the search history submenu visibility on focused input
    await expect(page.getByTestId("Search history submenu")).toBeVisible(); // Why not work with getByRole('dialog', ...) ?

    // Verify the search history submenu content
    await expect(
      page
        .getByTestId("Search history submenu")
        .getByRole("button", { name: "Eminem" }),
    ).toBeVisible();
    await expect(
      page
        .getByTestId("Search history submenu")
        .getByRole("button", { name: "Dubstep" }),
    ).toBeVisible();

    // Select previous search
    await page
      .getByTestId("Search history submenu")
      .getByRole("button", { name: "Eminem" })
      .click();
    await expect(
      page.getByPlaceholder("What do you want hear today?"),
    ).toHaveValue("Eminem");
    // Check search results with selected search history
    await listVisibility(page, "Eminem");
  });

  test("search filters", async ({ page }) => {
    await page.goto("localhost:3000");

    await search(page, "Defqon 2018");
    await selectSearchType(page, "playlist");
    await listVisibility(page, "Defqon 2018");
  });
});
