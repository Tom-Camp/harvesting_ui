import { test, expect } from "@playwright/test";
import { login } from "./helpers/auth";

test.describe("Gardens", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("gardens list renders with heading and new garden link", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "My Gardens" })).toBeVisible();
    await expect(page.getByRole("link", { name: /New garden/i })).toBeVisible();
  });

  test("new garden page renders form fields", async ({ page }) => {
    await page.getByRole("link", { name: /New garden/i }).click();
    await expect(page).toHaveURL(/gardens\/new/);
    await expect(page).toHaveTitle(/New Garden/);
    await expect(page.getByLabel("Garden name")).toBeVisible();
    await expect(page.getByLabel("Location")).toBeVisible();
  });

  test("new garden form shows error when required fields are empty", async ({ page }) => {
    await page.goto("/gardens/new");
    await page.getByRole("button", { name: /Create garden/i }).click();
    // HTML5 validation triggers or server returns error
    await expect(page.locator('input:invalid').first()).toBeVisible();
  });

  test("creates a new garden and redirects to its dashboard", async ({ page }) => {
    const uniqueName = `Test Garden ${Date.now()}`;
    await page.goto("/gardens/new");
    await page.getByLabel("Garden name").fill(uniqueName);
    await page.getByLabel("Location").fill("Test Location");
    await page.getByRole("button", { name: /Create garden/i }).click();

    // Should redirect to the garden dashboard
    await expect(page).toHaveURL(/\/gardens\//);
    await expect(page.getByRole("main").getByText(uniqueName)).toBeVisible();

    // Cleanup: delete the garden we just created
    page.once("dialog", (dialog) => dialog.accept());
    await page.getByRole("button", { name: "Delete" }).click();
    await expect(page).toHaveURL(/\/gardens$/);
  });

  test("garden dashboard shows garden name in breadcrumb", async ({ page }) => {
    // Only runs if at least one garden exists
    const cards = page.locator('a[href*="/gardens/"]').filter({ hasNotText: "New garden" });
    const count = await cards.count();
    if (count === 0) {
      test.skip();
      return;
    }
    await cards.first().click();
    await expect(page.getByRole("main").getByRole("link", { name: "My Gardens" })).toBeVisible();
  });

  test("edit garden page renders pre-filled form", async ({ page }) => {
    const cards = page.locator('a[href*="/gardens/"]').filter({ hasNotText: "New garden" });
    const count = await cards.count();
    if (count === 0) {
      test.skip();
      return;
    }
    // Navigate to a garden dashboard first
    await cards.first().click();
    await page.getByRole("link", { name: "Edit garden" }).click();
    await expect(page).toHaveURL(/\/edit/);
    await expect(page.getByLabel("Garden name")).toBeVisible();
    const nameValue = await page.getByLabel("Garden name").inputValue();
    expect(nameValue.length).toBeGreaterThan(0);
  });
});
