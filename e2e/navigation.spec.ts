import { test, expect } from '@playwright/test';

test.describe('Navigation and Cross-Browser', () => {
  test('should navigate from 404 back to homepage', async ({ page }) => {
    // Start on non-existent page
    await page.goto('/non-existent-page');
    let heading = page.locator('h1');
    await expect(heading).toContainText('Page introuvable');

    // Click link to go home
    const homeLink = page.locator('a');
    await homeLink.click();

    // Should be on homepage
    await expect(page).toHaveURL('/');
    heading = page.locator('h1');
    await expect(heading).toContainText('Mothome');
  });

  test('should load all required fonts', async ({ page }) => {
    await page.goto('/');

    const fontVariables = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return {
        inter: style.getPropertyValue('--font-inter').trim(),
        barlow: style.getPropertyValue('--font-barlow-condensed').trim(),
        bebas: style.getPropertyValue('--font-bebas-neue').trim(),
      };
    });

    expect(fontVariables.inter).toBeTruthy();
    expect(fontVariables.barlow).toBeTruthy();
    expect(fontVariables.bebas).toBeTruthy();
  });

  test('should have proper HTML structure across pages', async ({ page }) => {
    // Test home page structure
    await page.goto('/');
    let html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'fr');

    let body = page.locator('body');
    await expect(body).toBeVisible();

    let main = page.locator('main');
    await expect(main).toBeVisible();

    // Test 404 page structure
    await page.goto('/non-existent');
    html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'fr');

    body = page.locator('body');
    await expect(body).toBeVisible();

    main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should have consistent viewport behavior on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Home page
    await page.goto('/');
    let main = page.locator('main');
    await expect(main).toBeVisible();

    // 404 page
    await page.goto('/non-existent');
    main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should have consistent viewport behavior on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    // Home page
    await page.goto('/');
    let main = page.locator('main');
    await expect(main).toBeVisible();

    // 404 page
    await page.goto('/non-existent');
    main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should have consistent viewport behavior on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Home page
    await page.goto('/');
    let main = page.locator('main');
    await expect(main).toBeVisible();

    // 404 page
    await page.goto('/non-existent');
    main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should render properly on different screen orientations', async ({ page }) => {
    // Portrait mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    let heading = page.locator('h1');
    await expect(heading).toBeVisible();

    // Landscape mobile
    await page.setViewportSize({ width: 667, height: 375 });
    heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('should not have broken images or resources', async ({ page }) => {
    let requestsFailed = false;

    page.on('response', (response) => {
      if (response.status() >= 400 && response.request().resourceType() === 'image') {
        requestsFailed = true;
      }
    });

    await page.goto('/');
    expect(requestsFailed).toBeFalsy();
  });

  test('should load styles without FOUC (Flash of Unstyled Content)', async ({
    page,
  }) => {
    await page.goto('/');

    const heading = page.locator('h1');
    const isVisible = await heading.isVisible();
    expect(isVisible).toBe(true);

    // Check that styles are applied
    const color = await heading.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    expect(color).toBeTruthy();
  });

  test('should be responsive to viewport changes', async ({ page }) => {
    await page.goto('/');

    // Start at mobile
    await page.setViewportSize({ width: 375, height: 667 });
    let heading = page.locator('h1');
    await expect(heading).toBeVisible();

    // Resize to desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    heading = page.locator('h1');
    await expect(heading).toBeVisible();

    // Verify heading is still visible and properly styled
    const isVisible = await heading.isVisible();
    expect(isVisible).toBe(true);
  });

  test('should maintain accessibility across all pages', async ({ page }) => {
    // Home page
    await page.goto('/');
    let html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'fr');

    // 404 page
    await page.goto('/non-existent');
    html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'fr');

    // Both should have proper semantic structure
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should load without performance issues', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // Page should load within reasonable time (5 seconds)
    expect(loadTime).toBeLessThan(5000);
  });
});
