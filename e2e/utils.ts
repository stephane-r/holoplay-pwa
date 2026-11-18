import { Page, expect } from "@playwright/test";

export const navigateTo = async (
  page: Page,
  label: string,
  heading: string,
) => {
  await page
    .getByRole("navigation", { name: "App navigation" })
    .getByRole("button", { name: label })
    .click();
  await expect(
    page
      .getByRole("navigation", { name: "App navigation" })
      .getByRole("button", { name: label }),
  ).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("heading", { name: heading })).toBeVisible();
};

export const checkNotification = async (page: Page, value: RegExp) => {
  await expect(page.getByRole("alert")).toContainText(value);
  await page.getByRole("alert").getByRole("button").click();
  await expect(page.getByRole("alert")).not.toBeVisible();
};

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
  // Mantine's Select renders its input with role="combobox", not
  // "textbox" (readonly, opens a listbox of options on click).
  await page
    .getByRole("menu", { name: "Search filters" })
    .getByRole("combobox", { name: "Type filter" })
    .click();
  // await expect(
  //   page.getByRole("listbox").getByRole("option", { selected: true }),
  // ).toContainText(currentType);
  // await page.getByRole("listbox").getByRole("option", { name: type }).click();
  await expect(
    page.locator('[role="option"][value="video"][aria-selected="true"]'),
  ).toContainText(currentType);
  await page.locator(`[role="option"][value=${type}]`).click();
};

export const listVisibility = async (page: Page, label: string) => {
  // A real search request to whichever public instance got picked — give it
  // more room than the default 5s before calling it a failure.
  await expect(
    page.getByRole("heading", { name: `Search results : ${label}` }),
  ).toBeVisible({ timeout: 10000 });
  await expect(
    page.getByRole("list", { name: `Search result list ${label}` }),
  ).toBeVisible({ timeout: 10000 });
  await expect(
    page.getByRole("list", { name: `Search result list ${label}` }),
  ).not.toBeEmpty();
};

// Picks whichever instance the list happens to have first, rather than a
// specific hardcoded domain — public Invidious instances come and go, so
// pinning the test to one by name means it breaks the moment that instance
// disappears (as happened to the previously hardcoded "invidious.fdn.fr").
export const selectedInstance = async (page: Page) => {
  await navigateTo(page, "Settings", "Settings");
  await page.getByRole("button", { name: /General/ }).click();
  const instancesList = page.getByRole("list", {
    name: "Invidious instances list",
  });
  await expect(instancesList).toBeVisible();

  const firstInstance = instancesList.getByRole("listitem").first();
  await expect(firstInstance).toBeVisible();
  await firstInstance.getByTestId("use").click();
  await expect(firstInstance).toHaveAttribute("aria-current", "true");
};
