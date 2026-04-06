import { defineConfig, devices } from "@playwright/test";

const dashboardPort = process.env.DASHBOARD_PORT || process.env.PORT || "20128";
const dashboardBaseUrl = `http://localhost:${dashboardPort}`;
const webServerReadyUrl = `${dashboardBaseUrl}/api/monitoring/health`;
const playwrightServerMode = process.env.OMNIROUTE_PLAYWRIGHT_SERVER_MODE || "start";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: ["**/*.spec.ts"],
  fullyParallel: false,
  timeout: 600_000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "html",
  expect: {
    timeout: process.env.CI ? 30_000 : 10_000,
  },
  use: {
    baseURL: dashboardBaseUrl,
    navigationTimeout: 300_000,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: `node scripts/run-next-playwright.mjs ${playwrightServerMode}`,
    url: webServerReadyUrl,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
});
