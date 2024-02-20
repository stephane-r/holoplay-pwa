import { expect, test } from "@playwright/test";

import {
  checkNotification,
  navigateTo,
  search,
  selectSearchType,
  selectedInstance,
} from "./utils";

const createPlaylist = async (page, title: string) => {
  await selectedInstance(page, "invidious.projectsegfau.lt");
  await navigateTo(page, "Playlists", "Playlists");

  // Open modal to create playlist
  await page
    .getByRole("button", { name: "Open modal to create playlist" })
    .click();

  // Fill form to create playlist
  await page
    .getByRole("form", { name: "Form create playlist" })
    .getByPlaceholder("My awesome title")
    .fill(title);
  await page
    .getByRole("form", { name: "Form create playlist" })
    .getByRole("button", { name: "Create playlist" })
    .click();

  // Verify notification visibility
  await checkNotification(page, /has been created/);
};

test.describe.serial("playlists", () => {
  test("create playlist and add video", async ({ page }) => {
    await page.goto("localhost:3000");
    await createPlaylist(page, "My first playlist");

    // Check some elements on the playlist card
    await expect(
      page.getByRole("heading", { name: "My first playlist" }),
    ).toBeVisible();
    await expect(page.getByRole("listitem")).toContainText("0 videos");

    // Go to playlist detail
    await page.getByRole("heading", { name: "My first playlist" }).click();
    await expect(
      page.getByRole("heading", { name: "My first playlist" }),
    ).toBeVisible();
    await expect(page.getByRole("alert")).toContainText(
      /My first playlist is empty/,
    );

    // Go back to playlists
    await page.getByRole("button", { name: "Back to previous page" }).click();
    await expect(
      page.getByRole("heading", { name: "Playlists" }),
    ).toBeVisible();

    // Go to trending and wait for the list to be visible
    await navigateTo(page, "Trending", "Trending");
    await expect(page.getByRole("list", { name: "Trending" })).toBeVisible({
      timeout: 10000,
    });

    await page
      .getByRole("listitem")
      .first()
      .getByRole("button", { name: "Card menu" })
      .click();

    await expect(page.getByRole("menu")).toBeVisible();
    await page
      .getByRole("menu")
      .getByRole("menuitem", { name: "Add to playlist" })
      .click();

    await expect(
      page.getByRole("form", { name: "Form add to playlist" }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("form", { name: "Form add to playlist" })
        .getByRole("button", { name: "Add to playlist" }),
    ).not.toBeEnabled();
    await page
      .getByRole("form", { name: "Form add to playlist" })
      .getByPlaceholder("Your playlist")
      .click();
    await page.locator('[value="My first playlist"]').click();
    await expect(
      page
        .getByRole("form", { name: "Form add to playlist" })
        .getByRole("button", { name: "Add to playlist" }),
    ).toBeEnabled();
    await page
      .getByRole("form", { name: "Form add to playlist" })
      .getByRole("button", { name: "Add to playlist" })
      .click();

    // Verify notification visibility
    await checkNotification(page, /Added to playlist/);

    // Go to playlists
    await navigateTo(page, "Playlists", "Playlists");

    await expect(page.getByRole("listitem")).toContainText("1 videos");

    // Save remote playlist to user playlists
    await selectSearchType(page, "playlist");
    await search(page, "Tomorrowland 2018");

    await page
      .getByRole("list", { name: "Search result list Tomorrowland 2018" })
      .getByRole("listitem")
      .first()
      .getByRole("button", {
        name: "Save to playlists",
      })
      .click();

    await checkNotification(page, /added to your playlists list/);

    await page
      .getByRole("list", { name: "Search result list Tomorrowland 2018" })
      .getByRole("listitem")
      .nth(3)
      .getByRole("button", {
        name: "Save to playlists",
      })
      .click();

    await checkNotification(page, /added to your playlists list/);

    await navigateTo(page, "Playlists", "Playlists");

    await page.reload();

    // Check persisted data
    await expect(
      page.getByRole("heading", { name: "Playlists" }),
    ).toBeVisible();
    await expect(
      page.getByRole("list", { name: "Playlists list" }).getByRole("listitem"),
    ).toHaveCount(3);
  });

  test("edit playlist", async ({ page }) => {
    await page.goto("localhost:3000");
    await createPlaylist(page, "Awesome playlist");

    // Open playlist menu
    await page.getByRole("button", { name: "Open playlist menu" }).click();
    await page
      .getByRole("menu")
      .getByRole("menuitem", { name: "Edit" })
      .click();

    await expect(
      page.getByRole("form", { name: "Form update playlist" }),
    ).toBeVisible();
    await page
      .getByRole("form", { name: "Form update playlist" })
      .getByPlaceholder("My awesome title")
      .fill("Awesome playlist updated");
    await page
      .getByRole("form", { name: "Form update playlist" })
      .getByRole("button", { name: "Update playlist" })
      .click();

    // Verify notification visibility
    await checkNotification(page, /Awesome playlist updated has been updated/);

    await page.reload();

    // Check persisted data
    await expect(
      page.getByRole("heading", { name: "Playlists" }),
    ).toBeVisible();
    await expect(
      page.getByRole("list", { name: "Playlists list" }).getByRole("listitem"),
    ).toHaveCount(1);
    await expect(
      page
        .getByRole("listitem")
        .getByRole("heading", { name: "Awesome playlist updated" }),
    ).toBeVisible();
  });

  test("remove playlist", async ({ page }) => {
    await page.goto("localhost:3000");
    await createPlaylist(page, "Awesome playlist");

    // Open playlist menu
    await page.getByRole("button", { name: "Open playlist menu" }).click();
    await page
      .getByRole("menu")
      .getByRole("menuitem", { name: "Delete" })
      .click();

    await expect(
      page.getByRole("form", { name: "Delete playlist" }),
    ).toBeVisible();
    await expect(
      page.getByRole("form", { name: "Delete playlist" }),
    ).toContainText(/Do you want deleted Awesome playlist playlist ?/);
    await page
      .getByRole("form", { name: "Delete playlist" })
      .getByRole("button", { name: "Delete playlist" })
      .click();

    await expect(page.getByTestId("playlists-empty")).toBeVisible();
    await expect(page.getByTestId("playlists-empty")).toContainText(
      /You have no playlist/,
    );
  });
});
