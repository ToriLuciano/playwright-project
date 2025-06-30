const { expect } = require("@playwright/test");

export class FppaHomePage {
  constructor(page) {
    this.page = page;
    this.url = 'https://www.fppaco.org';

    // Element identification (alphabetized)
    this.aboutLink = this.page.getByRole('link', { name: 'About' });
    this.employerPortalLabel = this.page.getByLabel('Employer Portal');
    this.employerPortalLink = this.page.getByRole('link', { name: 'Employer Portal' }).first();
    this.fidelityLink = this.page.getByRole('link', { name: 'Fidelity' });
    this.homePageTitle = this.page.locator('h1');
    this.homePageTitleText = 'Fire & Police Pension Association of Colorado';
    this.logoImage = this.page.locator('img[alt="Fire & Police Pension Association of Colorado"]');
    this.memberAccountPortalLabel = this.page.getByLabel('Member Account Portal (MAP)');
    this.memberAccountPortalLink = this.page.getByRole('link', { name: 'Member Account Portal (MAP)' }).first();
    this.memberFormsLink = this.page.getByRole('link', { name: 'Member Forms' });
    this.selfDirectedInvestmentsLink = this.page.getByRole('link', { name: 'Self-Directed Investments' });
    this.videosLink = this.page.getByRole('link', { name: 'Videos' });
  }
  //Functionsaria-label="About"
  async gotoHomePage() {
    await this.page.goto(this.url);
  }
}
