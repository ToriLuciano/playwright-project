const { expect } = require("@playwright/test");

export class FppaHomePage {
  constructor(page) {
    this.page = page;
    this.url = 'https://www.fppaco.org/';

    // Element identification (alphabetized)
    this.aboutLink = this.page.getByRole('link', { name: 'About' });
    this.employerPortalLink = this.page.getByText('Employer Portal');
    this.homePageTitle = this.page.locator('h1');
    this.homePageTitleText = 'Fire & Police Pension Association of Colorado';
    this.logoImage = this.page.locator('img[alt="Fire & Police Pension Association of Colorado"]');
    this.memberAccountPortalLink = this.page.getByRole('link', { name: 'Member Account Portal (MAP)' }).first();
  }
  //Functionsaria-label="About"
  async gotoHomePage() {
    await this.page.goto(this.url);
  }
}
