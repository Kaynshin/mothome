import { test, expect } from '@playwright/test';

test.describe('404 Page', () => {
  test('should display 404 page for non-existent route', async ({ page }) => {
    await page.goto('/non-existent-page');

    const heading = page.locator('h1');
    await expect(heading).toContainText('Page introuvable');
  });

  test('should display 404 error code', async ({ page }) => {
    await page.goto('/non-existent-page');

    const errorCode = page.locator('main > div > p').first();
    await expect(errorCode).toContainText('404');
  });

  test('should have a link back to homepage', async ({ page }) => {
    await page.goto('/non-existent-page');

    const homeLink = page.locator('a');
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute('href', '/');
    await expect(homeLink).toContainText('Retour à l\'accueil');
  });

  test('should navigate to homepage when clicking the link', async ({ page }) => {
    await page.goto('/non-existent-page');

    const homeLink = page.locator('a');
    await homeLink.click();

    // Should navigate to home page
    await expect(page).toHaveURL('/');
    const heading = page.locator('h1');
    await expect(heading).toContainText('Mothome');
  });

  test('should be centered and properly styled', async ({ page }) => {
    await page.goto('/non-existent-page');

    const main = page.locator('main');
    await expect(main).toHaveClass(/min-h-screen/);
    await expect(main).toHaveClass(/flex/);
    await expect(main).toHaveClass(/items-center/);
    await expect(main).toHaveClass(/justify-center/);
  });

  test('should maintain layout on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/non-existent-page');

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    const homeLink = page.locator('a');
    await expect(homeLink).toBeVisible();
  });

  test('should maintain layout on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/non-existent-page');

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('should maintain layout on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/non-existent-page');

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('should have proper page title', async ({ page }) => {
    await page.goto('/non-existent-page');

    // Title should still be the layout title
    const pageTitle = await page.title();
    expect(pageTitle).toContain('Mothome');
  });

  test('should not have console errors', async ({ page }) => {
    let consoleErrors = false;
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors = true;
      }
    });

    await page.goto('/non-existent-page');
    expect(consoleErrors).toBeFalsy();
  });

  test('should be accessible with keyboard navigation', async ({ page }) => {
    await page.goto('/non-existent-page');

    // Tab to the link
    await page.keyboard.press('Tab');
    const homeLink = page.locator('a');
    await expect(homeLink).toBeFocused();
  });
});
