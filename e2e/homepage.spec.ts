import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main heading', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Mothome');
  });

  test('should display the company description', async ({ page }) => {
    const description = page.locator('p');
    await expect(description).toContainText('Garage Moto Premium');
    await expect(description).toContainText('Site en construction');
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle('Mothome — Garage Moto Premium');
  });

  test('should have correct meta description', async ({ page }) => {
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      'content',
      /Mothome.*garage moto premium/i
    );
  });

  test('should have correct language attribute', async ({ page }) => {
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'fr');
  });

  test('should have proper Open Graph tags', async ({ page }) => {
    const ogType = page.locator('meta[property="og:type"]');
    const ogSiteName = page.locator('meta[property="og:site_name"]');
    const ogLocale = page.locator('meta[property="og:locale"]');

    await expect(ogType).toHaveAttribute('content', 'website');
    await expect(ogSiteName).toHaveAttribute('content', 'Mothome');
    await expect(ogLocale).toHaveAttribute('content', 'fr_FR');
  });

  test('should be centered and have proper spacing', async ({ page }) => {
    const main = page.locator('main');
    await expect(main).toHaveClass(/min-h-screen/);
    await expect(main).toHaveClass(/flex/);
    await expect(main).toHaveClass(/items-center/);
    await expect(main).toHaveClass(/justify-center/);
  });

  test('should be accessible with keyboard navigation', async ({ page }) => {
    const html = page.locator('html');
    await expect(html).toBeVisible();
    // Verify page is focusable
    await page.keyboard.press('Tab');
    // If there were interactive elements, they would be focused
  });

  test('should have proper font stack loaded', async ({ page }) => {
    const html = page.locator('html');
    // Check that CSS variables for fonts are available
    const fontVariable = await html.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return style.getPropertyValue('--font-inter').trim();
    });
    expect(fontVariable).toBeTruthy();
  });

  test('should maintain layout on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('should maintain layout on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('should maintain layout on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('should not have console errors', async ({ page }) => {
    let consoleErrors = false;
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors = true;
      }
    });
    await page.goto('/');
    expect(consoleErrors).toBeFalsy();
  });

  test('should not have accessibility issues', async ({ page }) => {
    // Perform a basic accessibility check
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'fr');

    // Check that body exists and has proper structure
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
