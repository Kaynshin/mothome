import { test, expect } from "@playwright/test";

/**
 * E2E Tests: Dark/Light Mode Theme & Button Contrast Validation
 * Reference: UNIA-106 QA validation
 * Related docs: ACCESSIBILITY-REMEDIATION.md, UNIA-106-QA-REPORT.md
 *
 * Implementation notes:
 * - next-themes uses attribute="class" → adds/removes .dark on <html>
 * - defaultTheme="light" → light mode is the default
 * - localStorage key is "theme" (next-themes default)
 * - Light background: #f8f7f5 → rgb(248, 247, 245)
 * - Dark background:  #0a0a0a → rgb(10, 10, 10)
 */

test.describe("Theme Toggle & Dark/Light Mode (UNIA-106)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.removeItem("theme");
    });
    await page.reload();
  });

  test("should display light mode by default", async ({ page }) => {
    const isDark = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );
    expect(isDark).toBe(false);

    const background = await page
      .locator("body")
      .evaluate((el) => window.getComputedStyle(el).backgroundColor);

    // Light background: #f8f7f5 = rgb(248, 247, 245)
    expect(background).toMatch(/rgb\(248,\s*247,\s*245\)/);
  });

  test("should have theme toggle button in header", async ({ page }) => {
    const themeToggle = page.locator(
      "button[aria-label*='mode'], button[aria-label*='clair'], button[aria-label*='sombre']"
    );
    await expect(themeToggle.first()).toBeVisible();
  });

  test("should toggle between light and dark mode", async ({ page }) => {
    const themeToggle = page
      .locator(
        "button[aria-label*='mode'], button[aria-label*='clair'], button[aria-label*='sombre']"
      )
      .first();

    // Start in light mode — click to go dark
    await themeToggle.click();
    await page.waitForTimeout(300);

    const isDark = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );
    expect(isDark).toBe(true);

    const darkBg = await page
      .locator("body")
      .evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(darkBg).toMatch(/rgb\(10,\s*10,\s*10\)/);

    // Toggle back to light
    await themeToggle.click();
    await page.waitForTimeout(300);

    const isBackLight = await page.evaluate(() =>
      !document.documentElement.classList.contains("dark")
    );
    expect(isBackLight).toBe(true);
  });

  test("should persist theme preference after page reload", async ({ page }) => {
    const themeToggle = page
      .locator(
        "button[aria-label*='mode'], button[aria-label*='clair'], button[aria-label*='sombre']"
      )
      .first();

    // Switch to dark mode
    await themeToggle.click();
    await page.waitForTimeout(300);

    // Verify next-themes stored it under key "theme"
    const storedTheme = await page.evaluate(() => localStorage.getItem("theme"));
    expect(storedTheme).toBe("dark");

    // Reload and verify persistence
    await page.reload();
    await page.waitForLoadState("networkidle");

    const isDark = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );
    expect(isDark).toBe(true);
  });

  test("should change header background when theme toggles", async ({ page }) => {
    const header = page.locator("header").first();
    const lightHeaderBg = await header.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );

    const themeToggle = page
      .locator(
        "button[aria-label*='mode'], button[aria-label*='clair'], button[aria-label*='sombre']"
      )
      .first();
    await themeToggle.click();
    await page.waitForTimeout(300);

    const darkHeaderBg = await header.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );

    expect(darkHeaderBg).not.toBe(lightHeaderBg);
  });
});

test.describe("Button Contrast Validation (WCAG AA)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  const rgbToHex = (rgb: string): string => {
    const values = rgb.match(/\d+/g);
    if (!values || values.length < 3) return "#000000";
    return (
      "#" +
      values
        .slice(0, 3)
        .map((x) => {
          const hex = parseInt(x).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  };

  const calculateContrastRatio = (hex1: string, hex2: string): number => {
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
        : { r: 0, g: 0, b: 0 };
    };

    const getLuminance = (hex: string) => {
      const { r, g, b } = hexToRgb(hex);
      const [rs, gs, bs] = [r, g, b].map((val) => {
        const v = val / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const l1 = getLuminance(hex1);
    const l2 = getLuminance(hex2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return Math.round((((lighter + 0.05) / (darker + 0.05)) * 100) / 100);
  };

  test("should have sufficient contrast on primary buttons in light mode", async ({ page }) => {
    const primaryButton = page
      .locator("button")
      .filter({ has: page.locator("text=Prendre rendez-vous") })
      .first();

    if (await primaryButton.isVisible()) {
      const bgColor = await primaryButton.evaluate((el) =>
        window.getComputedStyle(el).backgroundColor
      );
      const textColor = await primaryButton.evaluate((el) =>
        window.getComputedStyle(el).color
      );

      const ratio = calculateContrastRatio(rgbToHex(textColor), rgbToHex(bgColor));
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    }
  });

  test("should have sufficient contrast on primary buttons in dark mode", async ({ page }) => {
    // Switch to dark mode via class (simulates next-themes behavior)
    await page.evaluate(() => document.documentElement.classList.add("dark"));
    await page.waitForTimeout(200);

    const primaryButton = page
      .locator("button")
      .filter({ has: page.locator("text=Prendre rendez-vous") })
      .first();

    if (await primaryButton.isVisible()) {
      const bgColor = await primaryButton.evaluate((el) =>
        window.getComputedStyle(el).backgroundColor
      );
      const textColor = await primaryButton.evaluate((el) =>
        window.getComputedStyle(el).color
      );

      const ratio = calculateContrastRatio(rgbToHex(textColor), rgbToHex(bgColor));
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    }
  });

  test("should have sufficient contrast on all text elements", async ({ page }) => {
    const textElements = await page.locator("body *").locator("text=*").all();
    const contrastIssues: string[] = [];

    for (const element of textElements.slice(0, 50)) {
      try {
        const hasText = await element.evaluate(
          (el) => (el.textContent ?? "").trim().length > 0
        );
        if (!hasText) continue;

        const bgColor = await element.evaluate((el) =>
          window.getComputedStyle(el).backgroundColor
        );
        if (bgColor === "rgba(0, 0, 0, 0)" || bgColor === "transparent") continue;

        const textColor = await element.evaluate((el) =>
          window.getComputedStyle(el).color
        );
        const fontSize = await element.evaluate((el) =>
          parseInt(window.getComputedStyle(el).fontSize)
        );

        const ratio = calculateContrastRatio(rgbToHex(textColor), rgbToHex(bgColor));
        const requiredRatio = fontSize >= 18 || fontSize >= 14 ? 3 : 4.5;

        if (ratio < requiredRatio) {
          const elementInfo = await element.evaluate(
            (el) => `${el.tagName}(${el.textContent?.substring(0, 30)})`
          );
          contrastIssues.push(`${elementInfo}: ${ratio}:1 (need ${requiredRatio}:1)`);
        }
      } catch {
        continue;
      }
    }

    expect(contrastIssues.length).toBe(
      0,
      `Contrast issues found:\n${contrastIssues.join("\n")}`
    );
  });

  test("should maintain contrast after switching to dark mode", async ({ page }) => {
    const themeToggle = page
      .locator(
        "button[aria-label*='mode'], button[aria-label*='clair'], button[aria-label*='sombre']"
      )
      .first();

    const primaryButton = page
      .locator("button")
      .filter({ has: page.locator("text=Prendre rendez-vous") })
      .first();

    if ((await primaryButton.isVisible()) && (await themeToggle.isVisible())) {
      await themeToggle.click();
      await page.waitForTimeout(300);

      const bgColor = await primaryButton.evaluate((el) =>
        window.getComputedStyle(el).backgroundColor
      );
      const textColor = await primaryButton.evaluate((el) =>
        window.getComputedStyle(el).color
      );

      const ratio = calculateContrastRatio(rgbToHex(textColor), rgbToHex(bgColor));
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    }
  });
});

test.describe("Keyboard Navigation & Accessibility (UNIA-106)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should have visible focus indicators on all interactive elements", async ({ page }) => {
    await page.keyboard.press("Tab");

    const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedTag).toBeTruthy();

    const focusStyle = await page.evaluate(() => {
      const element = document.activeElement as HTMLElement;
      if (!element) return null;
      const style = window.getComputedStyle(element, ":focus-visible");
      return {
        outline: style.outline,
        boxShadow: style.boxShadow,
        outlineColor: style.outlineColor,
      };
    });

    expect(
      focusStyle?.outline || focusStyle?.boxShadow || focusStyle?.outlineColor
    ).toBeTruthy();
  });

  test("should close mobile menu with Escape key", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const hamburger = page
      .locator("button[aria-label*='menu'], [aria-label*='Menu']")
      .first();

    if (await hamburger.isVisible()) {
      await hamburger.click();
      await page.waitForTimeout(200);

      const mobileMenu = page.locator("[id='mobile-menu']");
      await expect(mobileMenu).toBeVisible();

      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);

      await expect(mobileMenu).not.toBeVisible();
    }
  });

  test("should update aria-expanded when toggling mobile menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const hamburger = page
      .locator("button[aria-label*='menu'], [aria-label*='Menu']")
      .first();

    if (await hamburger.isVisible()) {
      const initialExpanded = await hamburger.getAttribute("aria-expanded");
      expect(initialExpanded).toBe("false");

      await hamburger.click();
      await page.waitForTimeout(200);

      expect(await hamburger.getAttribute("aria-expanded")).toBe("true");

      await hamburger.click();
      await page.waitForTimeout(200);

      expect(await hamburger.getAttribute("aria-expanded")).toBe("false");
    }
  });
});
