class FppaHomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = 'https://www.fppaco.org/';
  }

  async goto() {
    await this.page.goto(this.url);
  }
}

module.exports = { FppaHomePage };
