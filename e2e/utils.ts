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
  await page
    .getByRole("menu", { name: "Search filters" })
    .getByRole("textbox", { name: "Type filter" })
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

export const selectedInstance = async (page: Page, instanceUri: string) => {
  await navigateTo(page, "Settings", "Settings");
  await page.getByRole("button", { name: /General/ }).click();
  await expect(
    page.getByRole("list", { name: "Invidious instances list" }),
  ).toBeVisible();
  await expect(
    page.getByRole("listitem", { name: "invidious.projectsegfau.lt" }),
  ).toBeVisible();
  await page
    .getByRole("listitem", { name: "invidious.projectsegfau.lt" })
    .getByTestId("use")
    .click();
  await expect(
    page.getByRole("listitem", { name: "invidious.projectsegfau.lt" }),
  ).toHaveAttribute("aria-current", "true");
};
