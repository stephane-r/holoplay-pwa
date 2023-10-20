import { Page, expect, test } from "@playwright/test";

export const search = async (page: Page, value: string) => {
  // Check search bar visibility
  await expect(
    page.getByRole("form", { name: "Search bar form" }),
  ).toBeVisible();
  await page.getByPlaceholder("What do you want hear today?").fill(value);
  await page.getByPlaceholder("What do you want hear today?").press("Enter");
  await listVisibility(page, value);
};

export const selectSearchType = async (
  page: Page,
  type: string,
  currentType: string = "Videos",
) => {
  await page.getByRole("button", { name: "Open search filters" }).click();
  await expect(
    page.getByRole("menu", { name: "Search filters" }),
  ).toBeVisible();
  await page
    .getByRole("menu", { name: "Search filters" })
    .getByRole("textbox", { name: "Type filter" })
    .click();
  await expect(page.getByRole("listbox")).toBeVisible();
  await expect(
    page.getByRole("listbox").getByRole("option", { selected: true }),
  ).toContainText(currentType);
  await page.getByRole("listbox").getByRole("option", { name: type }).click();
};

const listVisibility = async (page: Page, label: string) => {
  await expect(
    page.getByRole("heading", { name: `Search results : ${label}` }),
  ).toBeVisible();
  await expect(
    page.getByRole("list", { name: `Search result list ${label}` }),
  ).toBeVisible();
  await expect(
    page.getByRole("list", { name: `Search result list ${label}` }),
  ).not.toBeEmpty();
};

test.describe.serial("search", () => {
  test("search an artist", async ({ page }) => {
    await page.goto("localhost:3000");

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
    await selectSearchType(page, "Playlists");
    await listVisibility(page, "Defqon 2018");
  });
});
