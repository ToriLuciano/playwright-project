# Playwright Frontend Testing Project

This project contains automated frontend tests using Playwright for web application testing.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## Installation

### 1. Initialize Node.js Project
```bash
npm init -y
```

### 2. Install Playwright
```bash
npm install -D @playwright/test
```

### 3. Install Browsers
Install the browsers that Playwright will use for testing:
```bash
npx playwright install
```

This installs:
- Chromium
- Firefox
- WebKit (Safari)

### 4. (Optional) Scaffold Example Tests
Generate a starter project with example tests:
```bash
npx playwright test --init
```

## Project Structure

```
├── tests/                    # Test files
│   ├── example.spec.js      # Example test
│   └── fppa-navigation.spec.js
├── playwright.config.js     # Playwright configuration
├── package.json
└── README.md
```

## Configuration

### Basic Configuration (playwright.config.js)
```javascript
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

## Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Tests in Headed Mode (with browser UI visible)
```bash
npx playwright test --headed
```

### Run Tests in a Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run a Specific Test File
```bash
npx playwright test example.spec.js
```

### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

### Run Tests with Code Generation (Record Actions)
```bash
npx playwright codegen https://www.fppaco.org/
```

## Viewing Test Results

### Open HTML Report
```bash
npx playwright show-report
```

### View Test Results in Browser
After running tests, the HTML report is automatically generated in the `playwright-report/` directory.

## Writing Tests

### Basic Test Structure
```javascript
const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  await page.goto('https://www.fppaco.org/');
  await expect(page).toHaveTitle(/Fire & Police Pension Association/);
});
```
### Test with Multiple Steps
```javascript
test('navigation test', async ({ page }) => {
  await page.goto('https://www.fppaco.org/');
  
  // Click on a link
  await page.click('text=Member Account Portal');
  
  // Assert URL change
  await expect(page).toHaveURL(/.*map/);
  
  // Assert element is visible
  await expect(page.locator('h1')).toBeVisible();
});
```

## Key Features

- **Multi-browser Support**: Test across Chromium, Firefox, and WebKit
- **Auto-waiting**: Automatically waits for elements to be ready
- **Network Interception**: Mock API calls and network requests
- **Mobile Testing**: Test responsive design with mobile viewports
- **Video Recording**: Record test runs for debugging
- **Screenshot Capture**: Automatic screenshots on test failures
- **Parallel Execution**: Run tests in parallel for faster execution

## Troubleshooting

### Common Issues

1. **Browser Installation Failed**
   ```bash
   npx playwright install --force
   ```

2. **Tests Running Too Fast**
   - Add `await page.waitForTimeout(1000);` for debugging
   - Use `await expect(element).toBeVisible();` instead

3. **Element Not Found**
   - Use Playwright's built-in auto-waiting
   - Check if element is in an iframe
   - Verify selector is correct

### Debug Mode
Run tests in debug mode to step through each action:
```bash
npx playwright test --debug
```

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Test Generator](https://playwright.dev/docs/codegen)

## Contributing

1. Create a new branch for your feature
2. Write tests for new functionality
3. Ensure all tests pass
4. Submit a pull request

## License

This project is licensed under the MIT License. 
