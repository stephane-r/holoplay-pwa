import { expect, test } from "@playwright/test";

import {
  checkNotification,
  navigateTo,
  search,
  selectedInstance,
} from "./utils";

const PLAYLIST_TITLE = "Sync playlist";

test("sync playlists and favorites to another device via backup code", async ({
  browser,
}) => {
  // Two browser contexts, several real network round trips (trending,
  // search, save, sync) — well past the default 30s test budget.
  test.setTimeout(120_000);

  const deviceA = await browser.newContext();
  const pageA = await deviceA.newPage();

  await pageA.goto("localhost:3000");
  await selectedInstance(pageA);

  // --- Create a playlist and add a video to it ---
  await navigateTo(pageA, "Playlists", "Playlists");
  await pageA
    .getByRole("button", { name: "Open modal to create playlist" })
    .click();
  await pageA
    .getByRole("form", { name: "Form create playlist" })
    .getByPlaceholder("My awesome title")
    .fill(PLAYLIST_TITLE);
  await pageA
    .getByRole("form", { name: "Form create playlist" })
    .getByRole("button", { name: "Create playlist" })
    .click();
  await checkNotification(pageA, /has been created/);

  await navigateTo(pageA, "Trending", "Trending");
  await expect(pageA.getByRole("list", { name: "Trending" })).toBeVisible({
    timeout: 10000,
  });
  await pageA
    .getByRole("listitem")
    .first()
    .getByRole("button", { name: "Card menu" })
    .click();
  await pageA
    .getByRole("menu")
    .getByRole("menuitem", { name: "Add to playlist" })
    .click();
  await pageA
    .getByRole("form", { name: "Form add to playlist" })
    .getByPlaceholder("Your playlist")
    .click();
  await pageA.locator(`[value="${PLAYLIST_TITLE}"]`).click();
  await pageA
    .getByRole("form", { name: "Form add to playlist" })
    .getByRole("button", { name: "Add to playlist" })
    .click();
  await checkNotification(pageA, /Added to playlist/);

  await navigateTo(pageA, "Playlists", "Playlists");
  await expect(pageA.getByRole("listitem")).toContainText("1 videos");

  // --- Add a favorite ---
  await pageA.getByRole("button", { name: "Search", exact: true }).click();
  await search(pageA, "Eminem");
  const favoriteCard = pageA
    .getByRole("list", { name: "Search result list Eminem" })
    .getByRole("listitem")
    .first();
  await expect(favoriteCard).toBeVisible({ timeout: 10000 });
  await favoriteCard.getByRole("button", { name: "Add to favorite" }).click();
  await expect(
    pageA.getByRole("button", { name: "Remove from favorite" }),
  ).toBeVisible();

  // --- Save data and get the backup code ---
  await navigateTo(pageA, "Settings", "Settings");
  await pageA
    .getByRole("button", { name: /Import, export or save your data/ })
    .click();
  // The radio input itself is visually hidden by Mantine's SegmentedControl;
  // click its visible label text instead.
  await pageA
    .getByRole("radiogroup")
    .getByText("Save", { exact: true })
    .click();
  await pageA
    .getByRole("button", { name: "Save playlists and favorites" })
    .click();
  await checkNotification(pageA, /Your data has been saved/);

  const codeAlert = pageA.getByRole("alert", { name: "Code" });
  await expect(codeAlert).toBeVisible({ timeout: 10000 });
  const rawCode = await codeAlert.locator("strong").textContent();
  const code = (rawCode ?? "").replace(/\D/g, "");
  expect(code).toHaveLength(6);

  // --- On a second device, sync using the backup code ---
  const deviceB = await browser.newContext();
  const pageB = await deviceB.newPage();

  await pageB.goto("localhost:3000");
  await selectedInstance(pageB);

  await pageB
    .getByRole("navigation", { name: "App navigation" })
    .getByRole("button", { name: "Sync data" })
    .click();
  const dialog = pageB.getByRole("dialog", { name: "Sync data" });
  await expect(dialog).toBeVisible();

  const boxes = dialog.getByRole("textbox");
  await expect(boxes).toHaveCount(6);
  for (let i = 0; i < 6; i++) {
    await boxes.nth(i).fill(code[i]);
  }
  await dialog.getByRole("button", { name: "Sync my data" }).click();
  await checkNotification(pageB, /Your data has been synchronized/);
  await expect(dialog).not.toBeVisible();

  // --- Verify the playlist was imported ---
  await navigateTo(pageB, "Playlists", "Playlists");
  await expect(
    pageB.getByRole("list", { name: "Playlists list" }).getByRole("listitem"),
  ).toHaveCount(1);
  await expect(
    pageB.getByRole("heading", { name: PLAYLIST_TITLE }),
  ).toBeVisible();
  await expect(pageB.getByRole("listitem")).toContainText("1 videos");

  // --- Verify the favorite was imported ---
  await navigateTo(pageB, "Favorites", "Favorites");
  await expect(
    pageB.getByRole("list", { name: "Favorites list" }).getByRole("listitem"),
  ).toHaveCount(1);

  await deviceA.close();
  await deviceB.close();
});

// Diagnostic: unlike the test above (which navigates to a fresh route after
// import, so a plain re-mount would show correct data even if live updates
// were broken), this one stays on the Favorites page the whole time and
// checks the list updates in place, with no navigation/reload at all.
test("imported favorite appears without navigating away or reloading", async ({
  browser,
}) => {
  test.setTimeout(120_000);

  const deviceA = await browser.newContext();
  const pageA = await deviceA.newPage();
  await pageA.goto("localhost:3000");
  await selectedInstance(pageA);

  await pageA.getByRole("button", { name: "Search", exact: true }).click();
  await search(pageA, "Eminem");
  const favoriteCard = pageA
    .getByRole("list", { name: "Search result list Eminem" })
    .getByRole("listitem")
    .first();
  await expect(favoriteCard).toBeVisible({ timeout: 10000 });
  await favoriteCard.getByRole("button", { name: "Add to favorite" }).click();
  await expect(
    pageA.getByRole("button", { name: "Remove from favorite" }),
  ).toBeVisible();

  await navigateTo(pageA, "Settings", "Settings");
  await pageA
    .getByRole("button", { name: /Import, export or save your data/ })
    .click();
  await pageA
    .getByRole("radiogroup")
    .getByText("Save", { exact: true })
    .click();
  await pageA
    .getByRole("button", { name: "Save playlists and favorites" })
    .click();
  await checkNotification(pageA, /Your data has been saved/);
  const rawCode = await pageA
    .getByRole("alert", { name: "Code" })
    .locator("strong")
    .textContent();
  const code = (rawCode ?? "").replace(/\D/g, "");

  const deviceB = await browser.newContext();
  const pageB = await deviceB.newPage();
  await pageB.goto("localhost:3000");
  await selectedInstance(pageB);

  // Stay on Favorites for the rest of the test — no navigateTo/reload after
  // this point.
  await navigateTo(pageB, "Favorites", "Favorites");
  const favoritesList = pageB
    .getByRole("list", { name: "Favorites list" })
    .getByRole("listitem");
  await expect(favoritesList).toHaveCount(0);

  await pageB
    .getByRole("navigation", { name: "App navigation" })
    .getByRole("button", { name: "Sync data" })
    .click();
  const dialog = pageB.getByRole("dialog", { name: "Sync data" });
  const boxes = dialog.getByRole("textbox");
  for (let i = 0; i < 6; i++) {
    await boxes.nth(i).fill(code[i]);
  }
  await dialog.getByRole("button", { name: "Sync my data" }).click();
  await checkNotification(pageB, /Your data has been synchronized/);
  await expect(dialog).not.toBeVisible();

  // No navigateTo/reload here — this must update live.
  await expect(favoritesList).toHaveCount(1);

  await deviceA.close();
  await deviceB.close();
});
