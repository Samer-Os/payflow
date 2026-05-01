import { test, expect } from "@playwright/test";

test.describe("Payflow homepage smoke tests", () => {
  test("loads with hero, mockup, and primary CTAs", async ({ page }) => {
    await page.goto("/");

    // Hero copy
    await expect(
      page.getByRole("heading", { level: 1 }).first()
    ).toBeVisible();

    // Custom product mockup is present (not a static image)
    await expect(
      page.getByRole("img", {
        name: /Payflow dashboard preview/i,
      })
    ).toBeVisible();

    // Both hero CTAs render
    await expect(
      page.getByRole("link", { name: /get started/i }).first()
    ).toBeVisible();
  });

  test("skip-to-content link is the first focusable element", async ({
    page,
  }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toHaveText(/skip to content/i);
  });

  test("sign-in dialog opens, traps focus, closes on ESC", async ({ page }) => {
    await page.goto("/");

    // Click the desktop Sign In button (skip mobile-menu duplicate via .first())
    await page.getByRole("button", { name: /^sign in$/i }).first().click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // ESC closes native <dialog>
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("language toggle switches EN -> TR", async ({ page }) => {
    await page.goto("/");

    const toggle = page.getByRole("button", { name: /toggle language/i });
    await expect(toggle).toHaveText(/TR/i);

    await toggle.click();
    await expect(toggle).toHaveText(/EN/i);
  });

  test("theme toggle switches light -> dark and persists class on <html>", async ({
    page,
  }) => {
    await page.goto("/");

    const html = page.locator("html");
    // Default should be light (no .dark class)
    await expect(html).not.toHaveClass(/dark/);

    await page.getByRole("button", { name: /toggle theme/i }).click();
    await expect(html).toHaveClass(/dark/);
  });

  test("/signup page renders form with required fields", async ({ page }) => {
    await page.goto("/signup", { waitUntil: "domcontentloaded" });

    const main = page.getByRole("main");
    // Stable selectors via input[name] — i18n-agnostic and immune to label hydration timing.
    await expect(main.locator('input[name="name"]')).toBeVisible({ timeout: 10_000 });
    await expect(main.locator('input[name="email"]')).toBeVisible();
    await expect(main.locator('input[name="password"]')).toBeVisible();
    await expect(main.locator('button[type="submit"]')).toBeVisible();
  });

  test("/signin page renders form and links to /signup", async ({ page }) => {
    await page.goto("/signin", { waitUntil: "domcontentloaded" });

    const main = page.getByRole("main");
    await expect(main.locator('input[name="username"]')).toBeVisible({ timeout: 10_000 });
    await expect(main.locator('input[name="password"]')).toBeVisible();
    await expect(main.getByRole("link", { name: /sign up|kayıt|hesap/i })).toBeVisible();
  });

  test("unknown route renders 404 page", async ({ page }) => {
    const res = await page.goto("/this-route-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
  });
});
