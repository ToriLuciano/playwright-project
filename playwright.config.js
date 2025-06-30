const { defineConfig } = require('@playwright/test');
const { devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e/tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://www.fppaco.org',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        headless: false,
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        headless: false,
        // Firefox-specific settings for external portals
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
      },
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        headless: false,
      },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
}); 