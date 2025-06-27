const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e/tests',
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
  },
}); 