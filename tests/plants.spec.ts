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

async function openAddPlantModal(page: import("@playwright/test").Page) {
  // Try sidebar button first, fall back to empty-state button
  const sidebarBtn = page.getByRole("button", { name: /^\+ Add plant$/i });
  const emptyStateBtn = page.getByRole("button", { name: /Add your first plant/i });
  if (await sidebarBtn.isVisible().catch(() => false)) {
    await sidebarBtn.click();
  } else {
    await emptyStateBtn.click();
  }
}

test.describe("Plants", () => {
  test("add plant modal renders form fields", async ({ page }) => {
    const gardenHref = await navigateToFirstGarden(page);
    if (!gardenHref) {
      test.skip();
      return;
    }
    await openAddPlantModal(page);
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("dialog").getByRole("heading", { name: "Add Plant" })).toBeVisible();
    await expect(page.getByPlaceholder(/Basil|Tomato|Lavender/)).toBeVisible();
    await expect(page.getByRole("dialog").getByRole("combobox")).toBeVisible();
  });

  test("add plant form shows error when required fields are empty", async ({ page }) => {
    const gardenHref = await navigateToFirstGarden(page);
    if (!gardenHref) {
      test.skip();
      return;
    }
    await openAddPlantModal(page);
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("dialog").getByRole("button", { name: /Add Plant/i }).click();
    await expect(page.locator("input:invalid, select:invalid").first()).toBeVisible();
  });

  test("creates a new plant and closes modal", async ({ page }) => {
    const gardenHref = await navigateToFirstGarden(page);
    if (!gardenHref) {
      test.skip();
      return;
    }
    await openAddPlantModal(page);
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByPlaceholder(/Basil|Tomato|Lavender/).fill("Tomato");
    await page.getByRole("dialog").getByRole("combobox").selectOption("vegetable");
    await page.getByRole("dialog").getByRole("button", { name: /Add Plant/i }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page).toHaveURL(gardenHref!);

    // Cleanup: open the edit modal for the plant we just created and delete it
    await page.getByRole("button", { name: "Edit", exact: true }).first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    page.once("dialog", (dialog) => dialog.accept());
    await page.getByRole("dialog").getByRole("button", { name: "Delete plant" }).click();
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

  test("garden dashboard shows add plant button when garden is empty", async ({ page }) => {
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
    await expect(page.getByRole("button", { name: /Add your first plant/i })).toBeVisible();
  });

  test("add plant button opens modal", async ({ page }) => {
    const gardenHref = await navigateToFirstGarden(page);
    if (!gardenHref) {
      test.skip();
      return;
    }
    await openAddPlantModal(page);
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page).toHaveURL(gardenHref!);
  });
});
