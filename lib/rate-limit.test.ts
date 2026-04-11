/**
 * Rate Limiting Utility Tests
 * Tests the rate limiting functionality
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { checkRateLimit } from "./rate-limit";

// Note: The rate-limit implementation uses a module-level Map store
// For proper testing, we would need to refactor to allow store injection
// These tests document the expected behavior

describe("Rate Limiting", () => {
  it("should allow first request", () => {
    const result = checkRateLimit("unique-test-key-1", {
      limit: 5,
      windowMs: 60 * 60 * 1000, // 1 hour
    });

    expect(result.success).toBe(true);
    expect(result.remaining).toBe(4); // 5 - 1
    expect(result.resetAt).toBeGreaterThan(Date.now());
  });

  it("should track remaining requests", () => {
    const key = "unique-test-key-remaining";
    const config = { limit: 3, windowMs: 60 * 60 * 1000 };

    // First request
    let result = checkRateLimit(key, config);
    expect(result.remaining).toBe(2);

    // Second request
    result = checkRateLimit(key, config);
    expect(result.remaining).toBe(1);

    // Third request
    result = checkRateLimit(key, config);
    expect(result.remaining).toBe(0);
  });

  it("should block request exceeding limit", () => {
    const key = "unique-test-key-limit";
    const config = { limit: 2, windowMs: 60 * 60 * 1000 };

    // Make 2 requests (allowed)
    checkRateLimit(key, config);
    checkRateLimit(key, config);

    // 3rd request should be blocked
    const result = checkRateLimit(key, config);
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("should return reset time when rate limited", () => {
    const key = "unique-test-key-reset";
    const windowMs = 60 * 1000; // 1 minute
    const config = { limit: 1, windowMs };

    // Make first request
    const firstResult = checkRateLimit(key, config);
    const resetAt = firstResult.resetAt;

    // Second request should be blocked
    const blockedResult = checkRateLimit(key, config);
    expect(blockedResult.success).toBe(false);
    expect(blockedResult.resetAt).toBe(resetAt);
    expect(resetAt).toBeGreaterThan(Date.now());
    expect(resetAt - Date.now()).toBeLessThanOrEqual(windowMs);
  });

  it("should track different keys separately", () => {
    const config = { limit: 1, windowMs: 60 * 1000 };

    // First key uses its limit
    const result1 = checkRateLimit("key-A", config);
    expect(result1.success).toBe(true);

    // First key is now rate limited
    const result1b = checkRateLimit("key-A", config);
    expect(result1b.success).toBe(false);

    // Second key should have its own limit
    const result2 = checkRateLimit("key-B", config);
    expect(result2.success).toBe(true);
  });

  it("should have proper reset time calculation", () => {
    const key = "unique-test-key-calc";
    const windowMs = 10 * 1000; // 10 seconds
    const beforeRequest = Date.now();

    const result = checkRateLimit(key, { limit: 5, windowMs });

    const afterRequest = Date.now();
    const expectedResetMin = beforeRequest + windowMs;
    const expectedResetMax = afterRequest + windowMs;

    expect(result.resetAt).toBeGreaterThanOrEqual(expectedResetMin);
    expect(result.resetAt).toBeLessThanOrEqual(expectedResetMax);
  });
});

describe("Contact Form Rate Limiting (5/hour)", () => {
  it("should handle contact form requests with correct config", () => {
    const ip = "192.168.1.100";
    const key = `contact:${ip}`;
    const config = { limit: 5, windowMs: 60 * 60 * 1000 }; // 5 per hour

    // First 5 requests should succeed
    for (let i = 0; i < 5; i++) {
      const result = checkRateLimit(key, config);
      expect(result.success).toBe(true);
    }

    // 6th request should be blocked
    const blockedResult = checkRateLimit(key, config);
    expect(blockedResult.success).toBe(false);
  });

  it("should use IP-based keying for contact form", () => {
    const config = { limit: 2, windowMs: 60 * 60 * 1000 };

    // IP 1 makes 2 requests
    for (let i = 0; i < 2; i++) {
      const result = checkRateLimit("contact:192.168.1.1", config);
      expect(result.success).toBe(true);
    }

    // IP 1 is now rate limited
    const result1Limited = checkRateLimit("contact:192.168.1.1", config);
    expect(result1Limited.success).toBe(false);

    // But IP 2 should still be allowed
    const result2 = checkRateLimit("contact:192.168.1.2", config);
    expect(result2.success).toBe(true);
  });
});

describe("Rate Limit Response Behavior", () => {
  it("should return correct response structure", () => {
    const result = checkRateLimit("unique-test-key-struct", {
      limit: 5,
      windowMs: 60 * 1000,
    });

    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("remaining");
    expect(result).toHaveProperty("resetAt");

    expect(typeof result.success).toBe("boolean");
    expect(typeof result.remaining).toBe("number");
    expect(typeof result.resetAt).toBe("number");
  });

  it("should have remaining count correct when success", () => {
    const result = checkRateLimit("unique-test-key-count", {
      limit: 10,
      windowMs: 60 * 1000,
    });

    if (result.success) {
      expect(result.remaining).toBe(9); // limit - 1
      expect(result.remaining).toBeGreaterThanOrEqual(0);
    }
  });

  it("should have 0 remaining when rate limited", () => {
    const key = "unique-test-key-zero";
    const config = { limit: 1, windowMs: 60 * 1000 };

    // Use the limit
    checkRateLimit(key, config);

    // Now try to exceed
    const result = checkRateLimit(key, config);

    if (!result.success) {
      expect(result.remaining).toBe(0);
    }
  });
});

describe("Rate Limit Edge Cases", () => {
  it("should handle zero remaining when exactly at limit", () => {
    const key = "unique-test-key-zero-edge";
    const result = checkRateLimit(key, { limit: 1, windowMs: 60 * 1000 });

    expect(result.success).toBe(true);
    expect(result.remaining).toBe(0); // No more requests allowed
  });

  it("should preserve reset time across multiple checks", () => {
    const key = "unique-test-key-preserve";
    const config = { limit: 2, windowMs: 60 * 1000 };

    const result1 = checkRateLimit(key, config);
    const resetAt1 = result1.resetAt;

    const result2 = checkRateLimit(key, config);
    const resetAt2 = result2.resetAt;

    expect(resetAt1).toBe(resetAt2);
  });
});
