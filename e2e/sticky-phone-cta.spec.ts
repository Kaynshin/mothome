import { test, expect } from "@playwright/test";

/**
 * E2E Tests: Sticky Phone CTA
 *
 * Vérifie le comportement du sticky CTA téléphone sur mobile :
 * - Caché au load (scrollY=0, hero visible)
 * - Visible après dépassement du hero
 * - Attributs d'accessibilité et data-cta corrects
 * - Absent sur desktop (lg:hidden)
 * - Absent sur routes exclues (mentions légales)
 */

const MOBILE_VIEWPORT = { width: 375, height: 667 };
const DESKTOP_VIEWPORT = { width: 1280, height: 720 };

test.describe("Sticky Phone CTA — Mobile", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto("/");
  });

  test("est caché au chargement (scrollY=0, hero visible)", async ({ page }) => {
    // Au chargement, on est dans le hero — le sticky doit être invisible
    // (translate-y-full + opacity-0 + pointer-events-none)
    const sticky = page.locator('[data-cta="phone-sticky"]');
    await expect(sticky).toBeAttached();

    // L'ancre doit avoir pointer-events-none quand invisible
    // On vérifie via la classe ou l'opacité computée
    const opacity = await sticky.evaluate(
      (el) => window.getComputedStyle(el).opacity
    );
    expect(parseFloat(opacity)).toBeLessThan(1);
  });

  test("devient visible après un scroll de 800px", async ({ page }) => {
    // Scroll de 800px — dépasse le hero (85% de 667px ≈ 567px)
    await page.evaluate(() => window.scrollTo({ top: 800, behavior: "instant" }));
    // Laisser le temps au rAF de s'exécuter et au state React de se mettre à jour
    await page.waitForTimeout(200);

    const sticky = page.locator('[data-cta="phone-sticky"]');
    const opacity = await sticky.evaluate(
      (el) => window.getComputedStyle(el).opacity
    );
    expect(parseFloat(opacity)).toBe(1);
  });

  test("a le bon href tel:", async ({ page }) => {
    const sticky = page.locator('[data-cta="phone-sticky"]');
    await expect(sticky).toHaveAttribute("href", "tel:+33450733808");
  });

  test("a le bon aria-label", async ({ page }) => {
    const sticky = page.locator('[data-cta="phone-sticky"]');
    await expect(sticky).toHaveAttribute(
      "aria-label",
      "Appeler Mot'Home au 04 50 73 38 08"
    );
  });

  test("a les attributs data-cta corrects", async ({ page }) => {
    const sticky = page.locator('[data-cta="phone-sticky"]');
    await expect(sticky).toHaveAttribute("data-cta", "phone-sticky");
    await expect(sticky).toHaveAttribute("data-cta-location", "sticky");
    await expect(sticky).toHaveAttribute("data-cta-type", "phone");
  });
});

test.describe("Sticky Phone CTA — Desktop", () => {
  test("n'est jamais visible sur desktop, même après scroll", async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT);
    await page.goto("/");

    // Scroll important pour simuler navigation post-hero
    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: "instant" }));
    await page.waitForTimeout(200);

    const sticky = page.locator('[data-cta="phone-sticky"]');

    // Le composant est rendu mais masqué par lg:hidden (display: none)
    const display = await sticky.evaluate(
      (el) => window.getComputedStyle(el.closest("[class*='lg:hidden']") ?? el).display
    );
    // Sur desktop ≥1024px, lg:hidden force display:none
    expect(display).toBe("none");
  });
});

test.describe("Sticky Phone CTA — Routes exclues", () => {
  test("n'apparaît pas sur /mentions-legales même après scroll (viewport mobile)", async ({
    page,
  }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto("/mentions-legales");

    await page.evaluate(() => window.scrollTo({ top: 800, behavior: "instant" }));
    await page.waitForTimeout(200);

    // Le contrôleur retourne null sur cette route — aucun élément data-cta="phone-sticky"
    const sticky = page.locator('[data-cta="phone-sticky"]');
    await expect(sticky).toHaveCount(0);
  });
});
