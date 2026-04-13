import { test, expect } from "@playwright/test";
import { login } from "./helpers/auth";

test.describe("Auth", () => {
  test("login page renders and redirects authenticated users", async ({ page }) => {
    await page.goto("/auth/login");
    await expect(page).toHaveTitle(/Sign in/);
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Create one" })).toBeVisible();
  });

  test("shows error on invalid credentials", async ({ page }) => {
    await page.goto("/auth/login");
    await page.getByLabel("Email").fill("wrong@example.com");
    await page.getByLabel("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.locator('.text-red-700')).toBeVisible();
  });

  test("shows error when fields are empty", async ({ page }) => {
    await page.goto("/auth/login");
    await page.getByRole("button", { name: "Sign in" }).click();
    // HTML5 validation or server-side error
    await expect(page.locator('input:invalid').first()).toBeVisible();
  });

  test("register page renders with all fields", async ({ page }) => {
    await page.goto("/auth/register");
    await expect(page).toHaveTitle(/Create account/);
    await expect(page.getByLabel("First name")).toBeVisible();
    await expect(page.getByLabel("Last name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Create account" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Sign in" })).toBeVisible();
  });

  test("login navigates to register page", async ({ page }) => {
    await page.goto("/auth/login");
    await page.getByRole("link", { name: "Create one" }).click();
    await expect(page).toHaveURL(/register/);
  });

  test("register navigates to login page", async ({ page }) => {
    await page.goto("/auth/register");
    await page.getByRole("link", { name: "Sign in" }).click();
    await expect(page).toHaveURL(/login/);
  });

  test("unauthenticated access to /gardens redirects to login", async ({ page }) => {
    await page.goto("/gardens");
    await expect(page).toHaveURL(/login/);
  });

  test("successful login redirects to gardens", async ({ page }) => {
    await login(page);
    await expect(page).toHaveURL(/gardens/);
    await expect(page).toHaveTitle(/My Gardens/);
  });

  test("authenticated user visiting /auth/login is redirected to /gardens", async ({ page }) => {
    await login(page);
    await page.goto("/auth/login");
    await expect(page).toHaveURL(/gardens/);
  });

  test("logout clears session and redirects to login", async ({ page }) => {
    await login(page);
    await page.goto("/auth/logout");
    await expect(page).toHaveURL(/login/);
    // Confirm session is gone
    await page.goto("/gardens");
    await expect(page).toHaveURL(/login/);
  });
});
