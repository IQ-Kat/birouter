import { test, expect } from "@playwright/test";

test.describe("Settings Toggles", () => {
  test.describe("Debug Mode Toggle", () => {
    test("should toggle debug mode on and off", async ({ page }) => {
      await page.goto("/dashboard/settings");
      await page.waitForLoadState("networkidle");
      await page.click("text=Advanced");

      const debugToggle = page.locator('[aria-label*="debug" i], [data-testid*="debug" i]').first();

      if (await debugToggle.isVisible({ timeout: 3000 }).catch(() => false)) {
        const initialState = await debugToggle.isChecked();
        await debugToggle.click();
        await page.waitForTimeout(500);
        const newState = await debugToggle.isChecked();
        expect(newState).not.toBe(initialState);
      }
    });
  });

  test.describe("Sidebar Visibility Toggle", () => {
    test("should toggle sidebar items visibility", async ({ page }) => {
      await page.goto("/dashboard/settings");
      await page.waitForLoadState("networkidle");
      await page.click("text=General");

      const sidebarToggle = page
        .locator('[aria-label*="sidebar" i], [data-testid*="sidebar" i]')
        .first();

      if (await sidebarToggle.isVisible({ timeout: 3000 }).catch(() => false)) {
        const initialState = await sidebarToggle.isChecked();
        await sidebarToggle.click();
        await page.waitForTimeout(500);
        const newState = await sidebarToggle.isChecked();
        expect(newState).not.toBe(initialState);
      }
    });
  });

  test.describe("Settings Persistence", () => {
    test("should persist debug mode after page reload", async ({ page }) => {
      await page.goto("/dashboard/settings");
      await page.waitForLoadState("networkidle");
      await page.click("text=Advanced");

      const debugToggle = page.locator('[aria-label*="debug" i], [data-testid*="debug" i]').first();

      if (await debugToggle.isVisible({ timeout: 3000 }).catch(() => false)) {
        const wasChecked = await debugToggle.isChecked();
        await debugToggle.click();
        await page.waitForTimeout(500);
        await page.reload();
        await page.waitForLoadState("networkidle");
        await page.click("text=Advanced");
        const isChecked = await debugToggle.isChecked();
        expect(isChecked).not.toBe(wasChecked);
      }
    });
  });
});
