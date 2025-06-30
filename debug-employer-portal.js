const { chromium } = require('@playwright/test');

async function debugEmployerPortal() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('Navigating to FPPA home page...');
    await page.goto('https://www.fppaco.org/');
    await page.waitForLoadState();
    
    console.log('\n=== Opening Employer Portal ===');
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('link', { name: 'Employer Portal' }).first().click()
    ]);
    
    await newPage.waitForLoadState();
    console.log('Employer Portal URL:', await newPage.url());
    
    console.log('\n=== All form elements on Employer Portal ===');
    const allInputs = await newPage.locator('input').all();
    console.log(`Found ${allInputs.length} input elements:`);
    
    for (let i = 0; i < allInputs.length; i++) {
      try {
        const type = await allInputs[i].getAttribute('type');
        const placeholder = await allInputs[i].getAttribute('placeholder');
        const name = await allInputs[i].getAttribute('name');
        const id = await allInputs[i].getAttribute('id');
        console.log(`${i + 1}. Type: ${type}, Placeholder: "${placeholder}", Name: "${name}", ID: "${id}"`);
      } catch (e) {
        console.log(`${i + 1}. Error getting input info: ${e.message}`);
      }
    }
    
    console.log('\n=== All buttons on Employer Portal ===');
    const allButtons = await newPage.locator('button, input[type="submit"], input[type="button"]').all();
    console.log(`Found ${allButtons.length} button elements:`);
    
    for (let i = 0; i < allButtons.length; i++) {
      try {
        const type = await allButtons[i].getAttribute('type');
        const text = await allButtons[i].textContent();
        const value = await allButtons[i].getAttribute('value');
        console.log(`${i + 1}. Type: ${type}, Text: "${text?.trim()}", Value: "${value}"`);
      } catch (e) {
        console.log(`${i + 1}. Error getting button info: ${e.message}`);
      }
    }
    
    console.log('\n=== Page source preview ===');
    const pageSource = await newPage.content();
    console.log(pageSource.substring(0, 1000) + '...');
    
    // Wait a bit to see the page
    await newPage.waitForTimeout(10000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

debugEmployerPortal(); 