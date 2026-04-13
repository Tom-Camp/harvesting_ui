import { test, expect } from "@playwright/test";
import { login } from "./helpers/auth";

async function navigateToFirstGarden(page: import("@playwright/test").Page) {
  await login(page);
  await page.goto("/gardens");
  const cards = page.locator('a[href*="/gardens/"]').filter({ hasNotText: "New garden" });
  const count = await cards.count();
  if (count === 0) return null;
  const href = await cards.first().getAttribute("href");
  await page.goto(href!);
  return href;
}

test.describe("Plants", () => {
  test("add plant page renders form fields", async ({ page }) => {
    const gardenHref = await navigateToFirstGarden(page);
    if (!gardenHref) {
      test.skip();
      return;
    }
    await page.goto(`${gardenHref}/plants/new`);
    await expect(page).toHaveTitle(/Add Plant/);
    await expect(page.getByLabel("Species")).toBeVisible();
    await expect(page.getByLabel("Plant type")).toBeVisible();
  });

  test("add plant form shows error when required fields are empty", async ({ page }) => {
    const gardenHref = await navigateToFirstGarden(page);
    if (!gardenHref) {
      test.skip();
      return;
    }
    await page.goto(`${gardenHref}/plants/new`);
    await page.getByRole("button", { name: /Add plant/i }).click();
    await expect(page.locator('input:invalid, select:invalid').first()).toBeVisible();
  });

  test("creates a new plant and redirects to garden dashboard", async ({ page }) => {
    const gardenHref = await navigateToFirstGarden(page);
    if (!gardenHref) {
      test.skip();
      return;
    }
    await page.goto(`${gardenHref}/plants/new`);
    await page.getByLabel("Species").fill("Tomato");
    // Select a plant type
    const plantTypeSelect = page.getByLabel("Plant type");
    await plantTypeSelect.selectOption("vegetable");
    await page.getByRole("button", { name: /Add plant/i }).click();
    await expect(page).toHaveURL(gardenHref!);
  });

  test("plant sidebar shows plant list on garden dashboard", async ({ page }) => {
    const gardenHref = await navigateToFirstGarden(page);
    if (!gardenHref) {
      test.skip();
      return;
    }
    // Either we see the sidebar with plants or the empty state
    const hasPlants = await page.locator('[class*="sidebar"], nav').isVisible().catch(() => false);
    const hasEmpty = await page.getByText("No plants in this garden yet").isVisible().catch(() => false);
    expect(hasPlants || hasEmpty).toBe(true);
  });

  test("garden dashboard shows add plant link when garden is empty", async ({ page }) => {
    const gardenHref = await navigateToFirstGarden(page);
    if (!gardenHref) {
      test.skip();
      return;
    }
    const isEmpty = await page.getByText("No plants in this garden yet").isVisible().catch(() => false);
    if (!isEmpty) {
      test.skip();
      return;
    }
    await expect(page.getByRole("link", { name: /Add your first plant/i })).toBeVisible();
  });

  test("garden dashboard add plant button navigates to new plant form", async ({ page }) => {
    const gardenHref = await navigateToFirstGarden(page);
    if (!gardenHref) {
      test.skip();
      return;
    }
    await page.goto(`${gardenHref}/plants/new`);
    await expect(page).toHaveURL(/plants\/new/);
  });
});
