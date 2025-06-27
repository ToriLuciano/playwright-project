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
      await expect(homePage.memberFormsLink).toBeVisible();
      await expect(homePage.selfDirectedInvestmentsLink).toBeVisible();
      await expect(homePage.videosLink).toBeVisible();
      await expect(homePage.fidelityLink).toBeVisible();
      await expect(homePage.employerPortalLink).toBeVisible();
      await expect(homePage.employerPortalLabel).toBeVisible();
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

    await test.step('Navigate to Employer Portal', async () => {
      // Return to home page first
      await page.goto('https://www.fppaco.org/');
      
      // Wait for the new page to open when clicking the link
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        homePage.employerPortalLink.click()
      ]);
      
      // Switch to the new page and wait for it to load
      await newPage.waitForLoadState();
      
      // Check if we're on the Employer Portal page
      await expect(newPage).toHaveURL(/https:\/\/ep\.fppaco\.org/);
    });

    await test.step('Navigate to Fidelity', async () => {
      // Return to home page first
      await page.goto('https://www.fppaco.org/');
      
      // Wait for the new page to open when clicking the link
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        homePage.fidelityLink.click()
      ]);
      
      // Switch to the new page and wait for it to load
      await newPage.waitForLoadState();
      
      // Check if we're on the Fidelity page
      await expect(newPage).toHaveURL(/.*fidelity.*/);
    });

    await test.step('Navigate to Videos', async () => {
      // Return to home page first
      await page.goto('https://www.fppaco.org/');
      
      // Click the Videos link
      await homePage.videosLink.click();
      
      // Wait for navigation to complete
      await page.waitForLoadState();
      
      // Check if we're on the Videos page
      await expect(page).toHaveURL(/.*videos.*/);
    });

    await test.step('Navigate to Member Forms', async () => {
      // Return to home page first
      await page.goto('https://www.fppaco.org/');
      
      // Click the Member Forms link
      await homePage.memberFormsLink.click();
      
      // Wait for navigation to complete
      await page.waitForLoadState();
      
      // Check if we're on the Member Forms page
      await expect(page).toHaveURL(/.*forms.*/);
    });

    await test.step('Navigate to Self-Directed Investments', async () => {
      // Return to home page first
      await page.goto('https://www.fppaco.org/');
      
      // Click the Self-Directed Investments link
      await homePage.selfDirectedInvestmentsLink.click();
      
      // Wait for navigation to complete
      await page.waitForLoadState();
      
      // Check if we're on the Self-Directed Investments page
      await expect(page).toHaveURL(/.*investments.*/);
    });
  });
});