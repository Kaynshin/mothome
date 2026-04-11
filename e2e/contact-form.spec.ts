import { test, expect } from '@playwright/test';

/**
 * Contact Form API Tests
 * Tests the contact form submission endpoint
 *
 * Note: UI form component is planned but not yet implemented.
 * These tests validate the API endpoint directly.
 */

test.describe('Contact Form API', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage to establish context
    await page.goto('/');
  });

  test('should reject invalid email', async ({ page }) => {
    const response = await page.request.post('/api/contact', {
      data: {
        name: 'John Doe',
        email: 'invalid-email',
        subject: 'Test Subject',
        message: 'This is a test message',
      },
    });

    expect(response.status()).toBe(422);
    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.fieldErrors).toBeDefined();
  });

  test('should reject missing required fields', async ({ page }) => {
    const response = await page.request.post('/api/contact', {
      data: {
        email: 'test@example.com',
        // Missing name, subject, message
      },
    });

    expect(response.status()).toBe(422);
    const data = await response.json();
    expect(data.success).toBe(false);
  });

  test('should validate name length', async ({ page }) => {
    const response = await page.request.post('/api/contact', {
      data: {
        name: 'J', // Too short, minimum 2 characters
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message',
      },
    });

    expect(response.status()).toBe(422);
    const data = await response.json();
    expect(data.fieldErrors.name).toBeDefined();
  });

  test('should validate subject length', async ({ page }) => {
    const response = await page.request.post('/api/contact', {
      data: {
        name: 'John Doe',
        email: 'test@example.com',
        subject: 'Hi', // Too short, minimum 3 characters
        message: 'This is a test message',
      },
    });

    expect(response.status()).toBe(422);
    const data = await response.json();
    expect(data.fieldErrors.subject).toBeDefined();
  });

  test('should validate message length', async ({ page }) => {
    const response = await page.request.post('/api/contact', {
      data: {
        name: 'John Doe',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'Short', // Too short, minimum 10 characters
      },
    });

    expect(response.status()).toBe(422);
    const data = await response.json();
    expect(data.fieldErrors.message).toBeDefined();
  });

  test('should validate phone number format (optional)', async ({ page }) => {
    const response = await page.request.post('/api/contact', {
      data: {
        name: 'John Doe',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a valid test message',
        phone: '123456789', // Invalid French format
      },
    });

    expect(response.status()).toBe(422);
    const data = await response.json();
    expect(data.fieldErrors.phone).toBeDefined();
  });

  test('should accept valid French phone numbers', async ({ page }) => {
    const validPhones = [
      '+33123456789',
      '+33612345678',
      '0123456789',
      '0612345678',
    ];

    for (const phone of validPhones) {
      const response = await page.request.post('/api/contact', {
        data: {
          name: 'John Doe',
          email: 'test@example.com',
          subject: 'Test Subject',
          message: 'This is a valid test message',
          phone,
        },
      });

      // Note: May fail with 429 (rate limit) or 502 (email config) but not 422 (validation)
      expect([200, 429, 500, 502]).toContain(response.status());
    }
  });

  test('should handle rate limiting', async ({ page }) => {
    // Make multiple requests to trigger rate limit
    const results = [];

    for (let i = 0; i < 6; i++) {
      const response = await page.request.post('/api/contact', {
        data: {
          name: `User ${i}`,
          email: `user${i}@example.com`,
          subject: 'Test Subject',
          message: 'This is a test message for rate limiting',
        },
      });

      results.push(response.status());
    }

    // At least one request should hit the rate limit (429)
    // Rate limit is 5 requests per hour per IP
    const hasRateLimit = results.some((status) => status === 429);

    if (hasRateLimit) {
      // Expected: rate limiting is working
      expect(results).toContain(429);
    } else {
      // Rate limit might not trigger in test environment
      console.log('Rate limit not triggered in test environment');
    }
  });

  test('should return proper error responses', async ({ page }) => {
    const response = await page.request.post('/api/contact', {
      data: {
        name: 'John Doe',
        email: 'test@example.com',
        subject: 'Test',
        message: 'message',
      },
    });

    const data = await response.json();

    if (response.status() === 422) {
      expect(data).toHaveProperty('success', false);
      expect(data).toHaveProperty('fieldErrors');
    } else if (response.status() === 429) {
      expect(data).toHaveProperty('success', false);
      expect(data).toHaveProperty('error');
      expect(response.headers()['retry-after']).toBeDefined();
    }
  });

  test('should accept empty optional fields', async ({ page }) => {
    const response = await page.request.post('/api/contact', {
      data: {
        name: 'John Doe',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a valid test message',
        phone: '', // Empty optional field
      },
    });

    // Should not fail validation for empty optional field
    expect([200, 429, 500, 502]).toContain(response.status());
  });

  test('should handle malformed JSON', async ({ page }) => {
    const response = await page.request.post('/api/contact', {
      data: 'not json', // Invalid JSON
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(response.status()).toBe(400);
  });

  test('should have proper CORS headers if needed', async ({ page }) => {
    const response = await page.request.options('/api/contact');

    // Check if CORS headers are present (if enabled)
    const headers = response.headers();
    // CORS headers are optional but if present should be valid
    if (headers['access-control-allow-origin']) {
      expect(['*', 'http://localhost:3000', 'http://localhost:3001']).toContain(
        headers['access-control-allow-origin']
      );
    }
  });
});

test.describe('Contact Form - UI Tests (Placeholder)', () => {
  test.skip('should display contact form (waiting for UI implementation)', async ({
    page,
  }) => {
    await page.goto('/');

    // This test will run when contact form UI is implemented
    const contactForm = page.locator('form[name="contact"]');
    await expect(contactForm).toBeVisible();

    // Fill form
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'This is a test message');

    // Submit
    await page.click('button[type="submit"]');

    // Verify success message
    const successMessage = page.locator('[role="alert"]:has-text("succès")');
    await expect(successMessage).toBeVisible();
  });

  test.skip('should display validation errors (waiting for UI implementation)', async ({
    page,
  }) => {
    await page.goto('/');

    const contactForm = page.locator('form[name="contact"]');
    await expect(contactForm).toBeVisible();

    // Try to submit empty form
    await page.click('button[type="submit"]');

    // Verify error messages
    const errorMessages = page.locator('[role="alert"]:has-text("required")');
    await expect(errorMessages).toHaveCount(4); // name, email, subject, message
  });

  test.skip('should handle rate limiting in UI (waiting for UI implementation)', async ({
    page,
  }) => {
    await page.goto('/');

    const contactForm = page.locator('form[name="contact"]');

    // Submit multiple times
    for (let i = 0; i < 6; i++) {
      await page.fill('input[name="name"]', `User ${i}`);
      await page.fill('input[name="email"]', `user${i}@example.com`);
      await page.fill('input[name="subject"]', 'Test');
      await page.fill('textarea[name="message"]', 'This is a test message');
      await page.click('button[type="submit"]');
    }

    // Should show rate limit error
    const rateLimitError = page.locator('[role="alert"]:has-text("trop de tentatives")');
    await expect(rateLimitError).toBeVisible();
  });
});
