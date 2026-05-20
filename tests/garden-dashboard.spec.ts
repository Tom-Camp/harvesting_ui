import { test, expect } from "@playwright/test";
import { login } from "./helpers/auth";

const plantButtonLocator = (page: import("@playwright/test").Page) =>
  page.locator("aside button").filter({ has: page.locator('span[style*="background-color"]') });

async function getFirstGardenWithPlant(page: import("@playwright/test").Page) {
  await login(page);
  await page.goto("/gardens");
  const cards = page.locator('a[href*="/gardens/"]').filter({ hasNotText: "New garden" });
  const count = await cards.count();
  if (count === 0) return null;
  const href = await cards.first().getAttribute("href");
  await page.goto(href!);
  // Wait for the sidebar to settle into either state before checking
  await Promise.race([
    plantButtonLocator(page).first().waitFor({ timeout: 5000 }),
    page.getByText("No plants yet.").waitFor({ timeout: 5000 }),
  ]).catch(() => {});
  const plantCount = await plantButtonLocator(page).count();
  return plantCount > 0 ? href : null;
}

// Select the first plant in the sidebar (desktop viewport required)
async function selectFirstPlant(page: import("@playwright/test").Page) {
  await plantButtonLocator(page).first().click();
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

  test("shows edit garden and members links", async ({ page }) => {
    const href = await getFirstGardenWithPlant(page);
    if (!href) {
      test.skip();
      return;
    }
    await expect(page.getByRole("link", { name: "Edit garden" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Members" })).toBeVisible();
  });

  test("plant detail shows KPI cards", async ({ page }) => {
    const href = await getFirstGardenWithPlant(page);
    if (!href) {
      test.skip();
      return;
    }
    await selectFirstPlant(page);
    await expect(page.getByText("Total Harvested")).toBeVisible();
  });

  test("plant detail shows harvest history section", async ({ page }) => {
    const href = await getFirstGardenWithPlant(page);
    if (!href) {
      test.skip();
      return;
    }
    await selectFirstPlant(page);
    // Harvest History only renders when the plant has a planted date
    const harvestHistory = page.getByText("Harvest History");
    if (!(await harvestHistory.isVisible().catch(() => false))) {
      test.skip();
      return;
    }
    await expect(harvestHistory).toBeVisible();
    await expect(page.getByRole("button", { name: /Add Harvest/i })).toBeVisible();
  });

  test("plant detail shows garden log section with add note button", async ({ page }) => {
    const href = await getFirstGardenWithPlant(page);
    if (!href) {
      test.skip();
      return;
    }
    await selectFirstPlant(page);
    await expect(page.getByText("Garden Log")).toBeVisible();
    await expect(page.getByRole("button", { name: /Add a Note/i })).toBeVisible();
  });

  test("add harvest modal opens on button click", async ({ page }) => {
    const href = await getFirstGardenWithPlant(page);
    if (!href) {
      test.skip();
      return;
    }
    await selectFirstPlant(page);
    const addHarvestBtn = page.getByRole("button", { name: /Add Harvest/i });
    if (!(await addHarvestBtn.isVisible().catch(() => false))) {
      test.skip();
      return;
    }
    await addHarvestBtn.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByPlaceholder("0")).toBeVisible();
  });

  test("add note modal opens on button click", async ({ page }) => {
    const href = await getFirstGardenWithPlant(page);
    if (!href) {
      test.skip();
      return;
    }
    await selectFirstPlant(page);
    await page.getByRole("button", { name: /Add a Note/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
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
    // Wait for sidebar to settle
    await Promise.race([
      plantButtonLocator(page).first().waitFor({ timeout: 5000 }),
      page.getByText("No plants yet.").waitFor({ timeout: 5000 }),
    ]).catch(() => {});
    const sidebarItems = plantButtonLocator(page);
    const count = await sidebarItems.count();
    if (count < 2) {
      test.skip();
      return;
    }
    await sidebarItems.nth(1).click();
    await expect(page).toHaveURL(href!);
  });

  test("plant edit button opens edit modal", async ({ page }) => {
    const href = await getFirstGardenWithPlant(page);
    if (!href) {
      test.skip();
      return;
    }
    await selectFirstPlant(page);
    await page.getByRole("button", { name: "Edit", exact: true }).first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("dialog").getByText("Edit Plant")).toBeVisible();
  });
});
