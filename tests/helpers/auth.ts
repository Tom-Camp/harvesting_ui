import type { Page } from "@playwright/test";

export const TEST_EMAIL = process.env.TEST_EMAIL ?? "test@example.com";
export const TEST_PASSWORD = process.env.TEST_PASSWORD ?? "testpassword";

export async function login(page: Page) {
  await page.goto("/auth/login");
  await page.getByLabel("Email").fill(TEST_EMAIL);
  await page.getByLabel("Password").fill(TEST_PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("**/gardens");
}
