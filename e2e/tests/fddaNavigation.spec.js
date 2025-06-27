const { test, expect } = require('@playwright/test');
const { FppaHomePage } = require('../pages/FppaHomePage');

test('should navigate to the FPPA home page', async ({ page }) => {
  const homePage = new FppaHomePage(page);
  await homePage.goto();
  await expect(page).toHaveURL('https://www.fppaco.org/');
});