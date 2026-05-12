import { test, expect } from "@playwright/test";
import { login } from "./helpers/auth";

test.describe("Settings", () => {
  test("unauthenticated access redirects to login", async ({ page }) => {
    await page.goto("/settings");
    await expect(page).toHaveURL(/login/);
  });

  test("settings page renders with all profile fields", async ({ page }) => {
    await login(page);
    await page.goto("/settings");
    await expect(page).toHaveTitle(/Settings/);
    await expect(page.getByLabel("Username")).toBeVisible();
    await expect(page.getByLabel("First name")).toBeVisible();
    await expect(page.getByLabel("Last name")).toBeVisible();
    await expect(page.getByRole("button", { name: "Save changes" })).toBeVisible();
  });

  test("username field is required", async ({ page }) => {
    await login(page);
    await page.goto("/settings");
    await page.getByLabel("Username").clear();
    await page.getByRole("button", { name: "Save changes" }).click();
    await expect(page.locator("input:invalid").first()).toBeVisible();
  });

  test("can update profile and see success message", async ({ page }) => {
    await login(page);
    await page.goto("/settings");
    await page.getByLabel("Username").fill("testuser");
    await page.getByLabel("First name").fill("Test");
    await page.getByLabel("Last name").fill("User");
    await page.getByRole("button", { name: "Save changes" }).click();
    await expect(page.getByText("Profile updated.")).toBeVisible();
  });

  test("settings nav link is visible in app header", async ({ page }) => {
    await login(page);
    await page.goto("/gardens");
    const settingsLink = page.getByRole("link", { name: /testuser|Test User/ });
    await expect(settingsLink).toBeVisible();
    await settingsLink.click();
    await expect(page).toHaveURL(/settings/);
  });
});
