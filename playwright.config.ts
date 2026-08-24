import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.PORT || "3001";
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 14"] },
    },
  ],
  webServer: process.env.SKIP_WEB_SERVER
    ? undefined
    : {
        // `next dev` binds 3000 unless told otherwise, while BASE_URL above
        // defaults to 3001, so the runner waited on a port nothing was ever
        // listening on and every run died at the 60s webServer timeout.
        command: `pnpm dev --port ${PORT}`,
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
});
