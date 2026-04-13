import { test, expect } from "@playwright/test";
import { login } from "./helpers/auth";

async function getFirstGardenWithPlant(page: import("@playwright/test").Page) {
  await login(page);
  await page.goto("/gardens");
  const cards = page.locator('a[href*="/gardens/"]').filter({ hasNotText: "New garden" });
  const count = await cards.count();
  if (count === 0) return null;
  const href = await cards.first().getAttribute("href");
  await page.goto(href!);
  const hasPlants = !(await page.getByText("No plants in this garden yet").isVisible().catch(() => false));
  return hasPlants ? href : null;
}

test.describe("Garden Dashboard", () => {
  test("shows breadcrumb navigation", async ({ page }) => {
    const href = await getFirstGardenWithPlant(page);
    if (!href) {
      test.skip();
      return;
    }
    await expect(page.getByRole("main").getByRole("link", { name: "My Gardens" })).toBeVisible();
  });

  test("shows edit garden and delete garden buttons", async ({ page }) => {
    const href = await getFirstGardenWithPlant(page);
    if (!href) {
      test.skip();
      return;
    }
    await expect(page.getByRole("link", { name: "Edit garden" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Delete" })).toBeVisible();
  });

  test("plant detail shows KPI cards", async ({ page }) => {
    const href = await getFirstGardenWithPlant(page);
    if (!href) {
      test.skip();
      return;
    }
    await expect(page.getByText(/Days Growing|Years Growing/).first()).toBeVisible();
    await expect(page.getByText("Total Harvested")).toBeVisible();
  });

  test("plant detail shows harvest history section", async ({ page }) => {
    const href = await getFirstGardenWithPlant(page);
    if (!href) {
      test.skip();
      return;
    }
    await expect(page.getByText("Harvest History")).toBeVisible();
    await expect(page.getByRole("button", { name: /Add Harvest/i })).toBeVisible();
  });

  test("plant detail shows garden log section with add note button", async ({ page }) => {
    const href = await getFirstGardenWithPlant(page);
    if (!href) {
      test.skip();
      return;
    }
    await expect(page.getByText("Garden Log")).toBeVisible();
    await expect(page.getByRole("button", { name: /Add a Note/i })).toBeVisible();
  });

  test("add harvest modal opens on button click", async ({ page }) => {
    const href = await getFirstGardenWithPlant(page);
    if (!href) {
      test.skip();
      return;
    }
    await page.getByRole("button", { name: /Add Harvest/i }).click();
    // Modal dialog should appear with the amount input (placeholder "0")
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByPlaceholder("0")).toBeVisible();
  });

  test("add note modal opens on button click", async ({ page }) => {
    const href = await getFirstGardenWithPlant(page);
    if (!href) {
      test.skip();
      return;
    }
    await page.getByRole("button", { name: /Add a Note/i }).click();
    // Modal should appear
    await expect(page.getByRole("dialog").or(page.locator('[class*="modal"]'))).toBeVisible();
  });

  test("plant sidebar allows selecting different plants", async ({ page }) => {
    await login(page);
    await page.goto("/gardens");
    const cards = page.locator('a[href*="/gardens/"]').filter({ hasNotText: "New garden" });
    if (await cards.count() === 0) {
      test.skip();
      return;
    }
    const href = await cards.first().getAttribute("href");
    await page.goto(href!);
    const sidebarItems = page.locator('aside button, nav button').filter({ hasText: /\w+/ });
    const count = await sidebarItems.count();
    if (count < 2) {
      test.skip();
      return;
    }
    await sidebarItems.nth(1).click();
    // Should update the main content without navigation
    await expect(page).toHaveURL(href!);
  });

  test("plant edit link navigates to edit form", async ({ page }) => {
    const href = await getFirstGardenWithPlant(page);
    if (!href) {
      test.skip();
      return;
    }
    await page.getByRole("link", { name: "Edit", exact: true }).first().click();
    await expect(page).toHaveURL(/plants\/.*\/edit/);
  });
});
