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
  await expect(page.getByRole("heading", { name: heading })).toBeVisible();
};
