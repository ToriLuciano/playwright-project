# Playwright Frontend Testing Project

This project contains automated frontend tests using Playwright for web application testing, specifically designed for the FPPA (Fire & Police Pension Association of Colorado) website.

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

## Test Suite Overview

This project contains a comprehensive test suite for the FPPA website with the following test files:

### 1. Navigation Bar Tests (`navBarNavigation.spec.js`)
**Description**: Comprehensive navigation testing with enhanced coverage including content validation, accessibility, responsive behavior, and performance metrics.

**Features**:
- ✅ 11 comprehensive tests
- ✅ Cross-browser compatibility (Chrome, Firefox, Safari)
- ✅ Performance validation (load times < 10 seconds)
- ✅ Accessibility testing (keyboard navigation, ARIA attributes)
- ✅ Responsive design testing (desktop and mobile)
- ✅ Content validation for each page
- ✅ Error handling and resilience testing

**Run Commands**:
```bash
# Run with all browsers (headed)
npm run navBarTest

# Run with Chrome only (single worker)
npx playwright test --project=chromium e2e/tests/navBarNavigation.spec.js --headed --workers=1

# Run with Firefox only
npx playwright test --project=firefox e2e/tests/navBarNavigation.spec.js --headed --workers=1

# Run with Safari only
npx playwright test --project=webkit e2e/tests/navBarNavigation.spec.js --headed --workers=1
```

### 2. Employer Portal Login Tests (`employerPortalLogin.spec.js`)
**Description**: Tests the external employer portal login functionality, including form validation and cross-browser compatibility.

**Features**:
- ✅ External portal navigation testing
- ✅ Single-step login form validation (username only)
- ✅ Cross-browser security handling
- ✅ Form element validation
- ✅ Error handling for browser restrictions

**Run Commands**:
```bash
# Run with all browsers (headed)
npm run employerLogin

# Run with Chrome only
npx playwright test --project=chromium e2e/tests/employerPortalLogin.spec.js --headed --workers=1

# Run with Firefox only (with security bypass)
npx playwright test --project=firefox e2e/tests/employerPortalLogin.spec.js --headed --workers=1
```

### 3. FPPA Navigation Tests (`fppaNavigation.spec.js`)
**Description**: Basic navigation testing for the FPPA website with fundamental page validation.

**Features**:
- ✅ Basic page navigation
- ✅ URL validation
- ✅ Page content verification

**Run Commands**:
```bash
# Run with all browsers (headed)
npm run fppaNavigation

# Run with Chrome only (single worker)
npm run fppaNavigation:chrome
```

## Available NPM Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `test` | `npm test` | Run all tests across all browsers |
| `test:chrome` | `npm run test:chrome` | **Run all tests with Chrome only (single worker, headed)** |
| `test:headed` | `npm run test:headed` | Run all tests with browser UI visible |
| `test:debug` | `npm run test:debug` | Run all tests in debug mode |
| `navBarTest` | `npm run navBarTest` | **Enhanced navigation test suite (headed)** |
| `employerLogin` | `npm run employerLogin` | **Employer portal login test (headed)** |
| `fppaNavigation` | `npm run fppaNavigation` | Basic FPPA navigation test (headed) |
| `fppaNavigation:chrome` | `npm run fppaNavigation:chrome` | **FPPA navigation test with Chrome only (single worker)** |
| `report` | `npm run report` | Show HTML test report |

## Test Results Summary

### Navigation Bar Tests (11 tests)
- ✅ **Chrome**: 11/11 passed (32.3s)
- ✅ **Firefox**: 11/11 passed (37.8s)
- ✅ **Safari**: 11/11 passed (33.7s)

### Employer Portal Login Tests (2 tests)
- ✅ **Chrome**: 2/2 passed
- ✅ **Firefox**: 2/2 passed (with security bypass)
- ✅ **Safari**: 2/2 passed

### Cross-Browser Compatibility
All tests are designed to work across Chrome, Firefox, and Safari with proper handling of browser-specific behaviors and security restrictions.

## Project Structure

```
playwrightProject/
├── e2e/
│   ├── tests/
│   │   ├── navBarNavigation.spec.js      # Enhanced navigation tests
│   │   ├── employerPortalLogin.spec.js   # Employer portal tests
│   │   └── fppaNavigation.spec.js        # Basic navigation tests
│   └── pages/
│       └── FppaHomePage.js               # Page object model
├── playwright.config.js                  # Multi-browser configuration
├── package.json                          # NPM scripts and dependencies
└── README.md
```

## Configuration

### Multi-Browser Configuration (playwright.config.js)
```javascript
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e/tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://www.fppaco.org',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        headless: false,
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        headless: false,
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
      },
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        headless: false,
      },
    },
  ],
});
```

## Running Tests

### Quick Start Commands
```bash
# Run enhanced navigation tests (recommended)
npm run navBarTest

# Run all tests with Chrome only
npm run test:chrome

# Run employer portal tests
npm run employerLogin
```

### Advanced Commands
```bash
# Run all tests
npx playwright test

# Run tests in headed mode (with browser UI visible)
npx playwright test --headed

# Run tests in a specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run a specific test file
npx playwright test e2e/tests/navBarNavigation.spec.js

# Run tests in debug mode
npx playwright test --debug

# Run tests with single worker
npx playwright test --workers=1
```

## Viewing Test Results

### Open HTML Report
```bash
npx playwright show-report
```

### View Test Results in Browser
After running tests, the HTML report is automatically generated in the `playwright-report/` directory.

## Key Features

- **Multi-browser Support**: Test across Chromium, Firefox, and WebKit
- **Enhanced Coverage**: Performance, accessibility, responsive design, and error handling
- **Cross-browser Compatibility**: Handles browser-specific behaviors and security restrictions
- **Page Object Model**: Centralized element selectors in page objects
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

2. **Firefox Security Restrictions**
   - Firefox is configured to ignore HTTPS errors for external portals
   - Tests include proper error handling for security blocks

3. **Tests Running Too Fast**
   - Add `await page.waitForTimeout(1000);` for debugging
   - Use `await expect(element).toBeVisible();` instead

4. **Element Not Found**
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
