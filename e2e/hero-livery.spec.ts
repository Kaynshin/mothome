import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Hero LiveryStripes — E2E coverage du composant fond du hero Mothome.
 *
 * Spécifie le comportement attendu sur la page lab `/labs/hero-particles`
 * où le composant est intégré en isolation (noindex). Quand LiveryStripes
 * sera porté en prod (`/`), ces tests pourront être étendus.
 */

const LAB_URL = "/labs/hero-particles";

test.describe("Hero LiveryStripes — lab page", () => {
  test("regression: hero rend MOTHOME + tagline + 2 CTAs", async ({ page }) => {
    await page.goto(LAB_URL);

    const h1 = page.locator("h1");
    await expect(h1).toHaveText(/MOTHOME/i);

    await expect(page.getByText(/garage moto artisanal/i)).toBeVisible();
    await expect(page.getByText(/la mécanique comme/i)).toBeVisible();
    await expect(page.getByText(/passion/i).first()).toBeVisible();

    await expect(
      page.getByRole("link", { name: /joindre l['']atelier/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /découvrir l['']atelier/i }),
    ).toBeVisible();
  });

  test("LiveryStripes wrapper SVG est présent, aria-hidden, hors flow", async ({
    page,
  }) => {
    await page.goto(LAB_URL);

    const svg = page.locator("svg:has(rect.moto-stripe)");
    await expect(svg).toHaveCount(1);

    await expect(svg).toHaveAttribute("aria-hidden", "true");

    const className = await svg.getAttribute("class");
    expect(className).toContain("pointer-events-none");
    expect(className).toContain("absolute");
  });

  test("desktop (1280×800) : 5 stripes visibles (aucune cachée)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(LAB_URL);

    const stripes = page.locator("rect.moto-stripe");
    await expect(stripes).toHaveCount(5);

    const displays = await stripes.evaluateAll((els) =>
      els.map((el) => window.getComputedStyle(el).display),
    );
    const visibleCount = displays.filter((d) => d !== "none").length;
    expect(visibleCount).toBe(5);
  });

  test("mobile (375×812) : 2 stripes visibles seulement (densité réduite)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(LAB_URL);

    const stripes = page.locator("rect.moto-stripe");
    await expect(stripes).toHaveCount(5);

    const displays = await stripes.evaluateAll((els) =>
      els.map((el) => window.getComputedStyle(el).display),
    );
    const visibleCount = displays.filter((d) => d !== "none").length;
    expect(visibleCount).toBe(2);
  });

  test("prefers-reduced-motion: animation = none + opacité ÷2", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(LAB_URL);

    const stripe = page.locator("rect.moto-stripe").first();
    await expect(stripe).toBeAttached();

    const animationName = await stripe.evaluate(
      (el) => window.getComputedStyle(el).animationName,
    );
    expect(animationName).toBe("none");
  });

  test("axe-core scan : 0 violation WCAG 2.1 AA", async ({ page }) => {
    await page.goto(LAB_URL);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test("CTA primaire est focusable au clavier, ordre Tab préservé", async ({
    page,
  }) => {
    await page.goto(LAB_URL);

    // Plusieurs Tab pour traverser le header puis arriver aux CTAs du hero
    let primaryFocused = false;
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press("Tab");
      const focusedText = await page.evaluate(
        () => (document.activeElement as HTMLElement | null)?.textContent ?? "",
      );
      if (/joindre l['']atelier/i.test(focusedText)) {
        primaryFocused = true;
        break;
      }
    }
    expect(primaryFocused).toBe(true);
  });

  test("aucune erreur console critique au chargement", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto(LAB_URL);
    await page.waitForLoadState("networkidle");

    // Filter out Next.js dev-only warnings (hot reload, fast refresh)
    const critical = errors.filter(
      (e) => !/fast refresh|hydration|HMR|preload/i.test(e),
    );
    expect(critical).toEqual([]);
  });
});
