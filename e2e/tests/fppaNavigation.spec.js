exports.infoBox = {
  testName: "fppaNavigation.spec.js",
  testDescription: "Validation that the FPPA home page is loaded and the navigation links are visible",
  createdBy: "Vittorio Luciano",
  createdOn: "2025-06-27",
  lastUpdated: "2025-06-27",
  lastUpdatedBy: "Vittorio Luciano",
  status: "In Progress",
  tags: ["FPPA", "Navigation", "Home Page"],
  testSteps: [
    {
      step: "Navigate to the FPPA home page",
      expectedResult: "The FPPA home page is loaded and the navigation links are visible",
    },
  ],
};

const { faker } = require('@faker-js/faker');
const { test, expect } = require('@playwright/test');
const { FppaHomePage } = require('../pages/FppaHomePage');

test.describe('FPPA Navigation Tests', () => {
  test('should navigate to the FPPA home page', async ({ page, context }) => {
    const homePage = new FppaHomePage(page);

    await test.step('Go to the FPPA home page', async () => {
      await homePage.gotoHomePage();
      await expect(page).toHaveURL('https://www.fppaco.org/');
    });

    await test.step('Validate homepage elements', async () => {
      await expect(homePage.homePageTitle).toBeVisible();
      await expect(homePage.logoImage).toBeVisible();
      await expect(homePage.aboutLink).toBeVisible();
      await expect(homePage.memberAccountPortalLink).toBeVisible();
    });

    await test.step('Navigate to About page', async () => {
      await homePage.aboutLink.click();
      await expect(page).toHaveURL('https://www.fppaco.org/about');
    });

    await test.step('Return to home page', async () => {
      await page.goto('https://www.fppaco.org/');
      await expect(page).toHaveURL('https://www.fppaco.org/');
    });

    await test.step('Navigate to Member Account Portal', async () => {
      // Wait for the new page to open when clicking the link
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        homePage.memberAccountPortalLink.click()
      ]);
      
      // Switch to the new page and wait for it to load
      await newPage.waitForLoadState();
      
      // Check if we're on the AspenMAP page
      await expect(newPage).toHaveURL(/https:\/\/map\.fppaco\.org\/AspenMAP\/Account\/Login/);
    });
  });
});