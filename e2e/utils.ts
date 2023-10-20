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
