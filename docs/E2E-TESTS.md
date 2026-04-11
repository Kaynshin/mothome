# E2E Tests Documentation

## Overview

This project uses **Playwright** for comprehensive end-to-end (E2E) testing. All tests are located in the `/e2e` directory and test all pages of the application across multiple browsers and viewports.

## Pages Tested

- **Homepage** (`/`) - Main landing page with Mothome branding
- **404 Page** (`/non-existent-page`) - 404 error page and navigation back to home
- **Error Page** - Error boundary component testing
- **Navigation & Cross-Browser** - Multi-page navigation, viewport responsiveness, and cross-browser compatibility

## Running E2E Tests

### Prerequisites

Ensure dependencies are installed:

```bash
npm install
```

### Run Tests Locally

```bash
# Start dev server and run tests
npm run test:e2e

# Run tests in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run specific test file
npx playwright test e2e/homepage.spec.ts

# Run tests in debug mode (with inspector)
npx playwright test --debug

# Run tests with UI mode (interactive)
npx playwright test --ui
```

### View Test Results

```bash
# Open HTML report
npx playwright show-report
```

## Test Structure

Each test file follows this pattern:

```typescript
test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
  });

  test('should do something', async ({ page }) => {
    // Test implementation
  });
});
```

## Test Coverage

### Homepage Tests
- ✅ Page rendering and content visibility
- ✅ Proper SEO metadata (title, description, og tags)
- ✅ HTML language attribute
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Font loading
- ✅ Accessibility (keyboard navigation)
- ✅ Console error detection

### 404 Page Tests
- ✅ 404 error code display
- ✅ Proper error message
- ✅ Navigation link to homepage
- ✅ Link functionality
- ✅ Responsive layout across viewports
- ✅ Keyboard navigation

### Error Boundary Tests
- ✅ Error boundary component structure
- ✅ CSS loading without FOUC
- ✅ Page navigation stability
- ✅ Multi-viewport testing
- ✅ Console error monitoring

### Navigation & Cross-Browser Tests
- ✅ Page-to-page navigation
- ✅ Font variable loading
- ✅ HTML structure consistency
- ✅ Viewport responsiveness
- ✅ Orientation changes
- ✅ Resource loading
- ✅ CSS loading speed (FOUC prevention)
- ✅ Accessibility across pages
- ✅ Performance monitoring

## Browsers Tested

- **Desktop**
  - Chromium (Chrome)
  - Firefox
  - WebKit (Safari)
- **Mobile**
  - Chrome on Pixel 5 (375x667)
  - Safari on iPhone 12 (390x844)

## Viewports Tested

- **Mobile**: 375px (width) × 667px (height)
- **Tablet**: 768px × 1024px
- **Desktop**: 1920px × 1080px

## CI Integration

Tests run automatically on:
- Push to `main` branch
- Pull requests targeting `main` branch

The workflow:
1. Installs dependencies
2. Runs type check
3. Runs linter
4. Runs format check
5. Runs unit tests with coverage
6. **Builds the project**
7. **Installs Playwright browsers**
8. **Runs E2E tests**
9. Uploads test results as artifacts

## Configuration

Configuration is defined in `playwright.config.ts`:

- **Test directory**: `./e2e`
- **Base URL**: `http://localhost:3000`
- **Parallel execution**: Enabled (5 workers by default)
- **Retries**: 2 retries in CI, 0 locally
- **Timeout**: 30 seconds per test
- **Screenshot**: Captured on failure
- **Video**: Recorded on failure
- **Trace**: Recorded on first retry

## Best Practices

1. **Use page objects** for complex interactions
2. **Wait for elements** using proper selectors
3. **Test user workflows** not implementation details
4. **Keep tests isolated** and independent
5. **Use descriptive test names** that explain what's being tested
6. **Clean up** after tests (e.g., clearing cookies, local storage)

## Debugging

### Debug Mode

```bash
npx playwright test --debug
```

This opens the Inspector UI where you can:
- Step through tests
- Inspect DOM elements
- Execute JavaScript in console
- View source code

### UI Mode

```bash
npx playwright test --ui
```

Interactive test runner with:
- Side-by-side test editor and browser
- Run/pause controls
- Time travel debugging
- Browser console/network tabs

### Video/Screenshot Review

When tests fail:
- Screenshots saved to `test-results/` directory
- Videos saved in test results
- Trace files available for replay

## Troubleshooting

### Tests fail locally but pass in CI

- Ensure using same Node.js version (20.x)
- Clear `node_modules` and reinstall
- Check for timing issues (increase timeout)

### Playwright browsers not found

```bash
npx playwright install
```

### Port 3000 already in use

Kill the process or change port in `playwright.config.ts`

### Tests timeout

Increase timeout in specific test:

```typescript
test('slow test', async ({ page }) => {
  // Test code
}, { timeout: 60000 }); // 60 seconds
```

## Contributing

When adding new pages or features:

1. Create corresponding E2E test file (e.g., `e2e/new-page.spec.ts`)
2. Test all viewports and browsers
3. Test keyboard navigation and accessibility
4. Verify SEO metadata
5. Check for console errors
6. Run full test suite before submitting PR

## References

- [Playwright Documentation](https://playwright.dev)
- [Playwright Testing Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright Debugging](https://playwright.dev/docs/debug)

## Test Maintenance

- Review and update tests when UI changes
- Keep selectors stable (avoid brittle selectors)
- Monitor for flaky tests and fix root cause
- Regular cleanup of obsolete tests
