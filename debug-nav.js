const { chromium } = require('@playwright/test');

async function debugNavigation() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to FPPA home page...');
    await page.goto('https://www.fppaco.org/');
    await page.waitForLoadState();
    
    console.log('\n=== Current URL ===');
    console.log(await page.url());
    
    console.log('\n=== All navigation links found ===');
    const allLinks = await page.locator('nav a, header a, .navbar a, .navigation a').all();
    
    for (let i = 0; i < allLinks.length; i++) {
      try {
        const text = await allLinks[i].textContent();
        const href = await allLinks[i].getAttribute('href');
        console.log(`${i + 1}. Text: "${text?.trim()}" | Href: ${href}`);
      } catch (e) {
        console.log(`${i + 1}. Error getting link info: ${e.message}`);
      }
    }
    
    console.log('\n=== Looking for specific navigation elements ===');
    const navSelectors = [
      'nav',
      '.navbar',
      '.navigation',
      'header',
      '[role="navigation"]'
    ];
    
    for (const selector of navSelectors) {
      const elements = await page.locator(selector).all();
      console.log(`\nElements with selector "${selector}": ${elements.length}`);
      for (let i = 0; i < elements.length; i++) {
        try {
          const text = await elements[i].textContent();
          console.log(`  ${i + 1}. Content: "${text?.substring(0, 100)}..."`);
        } catch (e) {
          console.log(`  ${i + 1}. Error: ${e.message}`);
        }
      }
    }
    
    console.log('\n=== Testing specific link selectors ===');
    const testLinks = [
      'Benefits',
      'Active Members', 
      'Retirees',
      'Employers',
      'Forms & Resources'
    ];
    
    for (const linkText of testLinks) {
      try {
        const link = page.getByRole('link', { name: linkText });
        const count = await link.count();
        console.log(`"${linkText}": ${count} elements found`);
        if (count > 0) {
          const href = await link.first().getAttribute('href');
          console.log(`  Href: ${href}`);
        }
      } catch (e) {
        console.log(`"${linkText}": Error - ${e.message}`);
      }
    }
    
    // Wait a bit to see the page
    await page.waitForTimeout(5000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

debugNavigation(); 