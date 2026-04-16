# UNIA-106 Validation Checklist — QA Sign-Off

**Issue:** UNIA-106 — QA: validate dark/light mode and button contrast fixes  
**Status:** Ready for Implementation  
**QA Engineer:** John (f6fe744f-84aa-4899-8a1e-b431fad2b689)  
**Date:** 2026-04-14

---

## Phase 1: Pre-Implementation Review

> **Action Required:** Complete this phase BEFORE implementing any code changes

### QA Analysis Complete ✅

- [x] Analyzed current codebase state (main branch)
- [x] Identified contrast issues (orange-brule: 4.21:1, need 4.5:1)
- [x] Confirmed dark/light mode not yet implemented
- [x] Reviewed accessibility remediation guide
- [x] Created contrast validation script
- [x] Created comprehensive E2E test suite
- [x] Documented all blockers and issues

### Documentation Created ✅

- [x] UNIA-106-QA-REPORT.md — Current state analysis & blockers
- [x] scripts/validate-contrast.js — Automated contrast checker
- [x] e2e/theme-and-contrast.spec.ts — Complete E2E test suite
- [x] This checklist — Implementation validation steps

**Ready to proceed to Phase 2**

---

## Phase 2: Implementation Tracking

### Dark/Light Mode Feature

> **Reference:** ACCESSIBILITY-REMEDIATION.md, UNIA-106-QA-REPORT.md

#### Implementation Checklist

- [ ] **Create light mode color palette** in `app/globals.css`
  - Define light theme tokens (background, foreground, borders, shadows)
  - Ensure sufficient contrast in light mode (4.5:1 minimum)
  - Test colors against all UI components

- [ ] **Implement theme provider**
  - Option A: Use `next-themes` library
  - Option B: Create custom React Context
  - Must support: dark, light, system (auto-detect)

- [ ] **Add theme toggle button** to `components/layout/Header.tsx`
  - Add sun/moon icon button
  - Position in header (right side, near CTA)
  - Implement click handler to switch themes
  - Update `aria-label` dynamically

- [ ] **Add theme persistence**
  - Store preference in `localStorage` (key: `theme-preference`)
  - Load saved preference on page load
  - Respect system preference as fallback

- [ ] **Test theme switching**
  - Manual: Click toggle, verify colors change on all pages
  - Responsive: Test on mobile, tablet, desktop
  - Persistence: Reload page, verify theme persists
  - Keyboard: Tab to toggle, use Enter to activate

**Estimated effort:** 3-4 hours  
**Merge criteria:** E2E tests pass + manual testing complete

---

### Button Contrast Fix

> **Issue:** Orange-brule (#c84b11) = 4.21:1 on dark background (need 4.5:1)

#### Option A: Lighten Orange (Recommended)

```css
/* app/globals.css */
--color-orange-brule: #d65814;  /* New: 5.5:1 ✅ instead of 4.21:1 ❌ */
```

**Pros:**
- Minimal code changes
- No design impact (within brand palette)
- Improves button visibility

**Cons:**
- Slightly different color than brand specification
- May require approval from design team

**Validation:**
```bash
npm run validate:contrast
# Should show all buttons passing 4.5:1 threshold
```

#### Option B: Add Background Overlay

```tsx
// components/ui/button.tsx - default variant
"bg-primary/80 text-primary-foreground hover:bg-primary/90 backdrop-blur-sm"
```

**Pros:**
- Preserves original color tone
- Uses existing Tailwind utilities

**Cons:**
- More CSS, less explicit
- May affect button appearance

#### Option C: Use Darker Background

Reduce contrast by using darker background under button (less preferred).

**Recommendation:** Implement **Option A** (lighten to #d65814)

#### Implementation Steps

1. [ ] Choose solution (recommended: Option A)
2. [ ] Update `app/globals.css`
3. [ ] Run contrast validator: `npm run validate:contrast`
4. [ ] Verify new color on all pages
5. [ ] Manual visual inspection
6. [ ] Get design team approval (if color changed)

**Estimated effort:** 30 minutes  
**Merge criteria:** Contrast validator passes + visual approval

---

### Keyboard Navigation Improvements

> **Reference:** ACCESSIBILITY-REMEDIATION.md FIX #2 & #4

#### Mobile Menu Keyboard Fixes

**File:** `components/layout/Header.tsx`

- [ ] **Update aria-expanded** to dynamic string values
  ```tsx
  aria-expanded={mobileOpen ? "true" : "false"}  // not just {mobileOpen}
  ```

- [ ] **Update aria-label** dynamically
  ```tsx
  aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
  ```

- [ ] **Add Escape key handler**
  ```tsx
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [mobileOpen]);
  ```

#### Focus Indicators

**File:** `components/layout/Header.tsx`

- [ ] **Add focus-visible to nav links** (desktop)
  ```tsx
  className={cn(
    "... focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-orange-brule)]",
    ...
  )}
  ```

- [ ] **Add focus-visible to nav links** (mobile)
  - Same as desktop navigation links
  - Apply to mobile menu links

**Estimated effort:** 1-2 hours  
**Merge criteria:** E2E tests pass + keyboard navigation works

---

### Skip to Main Content Link

> **Reference:** ACCESSIBILITY-REMEDIATION.md FIX #3

#### Implementation Steps

- [ ] **Add skip link** to `components/layout/Header.tsx`
  ```tsx
  <a
    href="#main-content"
    className="absolute -top-12 left-0 z-[999] bg-[var(--color-orange-brule)] text-[var(--color-blanc-casse)] px-4 py-2 rounded-md font-semibold focus:top-4 transition-all focus-visible:outline-none"
  >
    Passer au contenu principal
  </a>
  ```

- [ ] **Add id to main element** in `app/layout.tsx`
  ```tsx
  <main id="main-content" className="flex-1 pt-16 md:pt-20">
  ```

**Estimated effort:** 15 minutes  
**Merge criteria:** Visual inspection (link visible on Tab)

---

## Phase 3: Testing & Validation

### Automated Tests

After implementation, run these commands to validate:

```bash
# 1. Run contrast validation
npm run validate:contrast
# Expected output: All tests pass ✅

# 2. Run E2E tests
npm run test:e2e -- e2e/theme-and-contrast.spec.ts
# Expected output: All tests pass ✅

# 3. Run full test suite
npm run test:e2e

# 4. Run Lighthouse audit
npm run build
npx lighthouse http://localhost:3000 --view
# Expected output: Accessibility score ≥ 95
```

### Manual Testing Checklist

#### Dark/Light Mode Testing

- [ ] **Theme Toggle**
  - [ ] Toggle button visible in header
  - [ ] Clicking toggle switches theme
  - [ ] Toggle works on all screen sizes (mobile, tablet, desktop)
  - [ ] Toggle responds to keyboard (Tab + Enter)

- [ ] **Visual Consistency**
  - [ ] All colors update when theme changes
  - [ ] Text contrast sufficient in both modes
  - [ ] No broken layouts or misaligned elements
  - [ ] Images/icons visible in both modes

- [ ] **Persistence**
  - [ ] Switch to light mode
  - [ ] Hard refresh (Ctrl+Shift+R)
  - [ ] Light mode still active
  - [ ] Test in incognito window (should use system preference)

- [ ] **All Pages**
  - [ ] Home page
  - [ ] À propos page
  - [ ] Bar page
  - [ ] Dépôt-Vente page
  - [ ] Accessoires page
  - [ ] Service à domicile page

#### Button Contrast Testing

- [ ] **Primary Buttons** (orange-brule)
  - [ ] Visible on noir-profond background
  - [ ] Visible on noir-doux background
  - [ ] Text readable (not blurry)
  - [ ] Hover state has sufficient contrast

- [ ] **Check all button variants**
  - [ ] Primary (CTA buttons)
  - [ ] Secondary buttons
  - [ ] Ghost buttons
  - [ ] Link buttons

- [ ] **WebAIM Contrast Checker** (manual validation)
  1. Open https://webaim.org/resources/contrastchecker/
  2. For each color combination:
     - Enter foreground color (button/text)
     - Enter background color
     - Verify ratio ≥ 4.5:1
     - Screenshot results

#### Keyboard Navigation Testing

- [ ] **Tab Navigation**
  - [ ] Press Tab from page start
  - [ ] Skip link visible immediately
  - [ ] Focus moves through all interactive elements
  - [ ] Focus order logical and intuitive

- [ ] **Mobile Menu (Mobile Viewport)**
  - [ ] Tab to hamburger button
  - [ ] Press Enter to open menu
  - [ ] Menu opens, focus moves to menu
  - [ ] Press Escape to close menu
  - [ ] Menu closes, focus returns to hamburger
  - [ ] aria-expanded changes: true ↔ false

- [ ] **Focus Indicators**
  - [ ] All links have visible focus outline
  - [ ] Focus outline color contrasts with background
  - [ ] Focus outline not hidden by other elements

#### Accessibility Audit

- [ ] **Lighthouse Audit**
  - Run: `npm run build && npx lighthouse http://localhost:3000 --view`
  - Accessibility score: ≥ 95/100
  - No critical or serious issues

- [ ] **axe DevTools** (Browser extension)
  - Install: https://www.axe-devtools.com
  - Run scan on each page
  - Result: 0 violations
  - Result: 0 critical issues

### Testing Sign-Off

- [ ] All automated tests passing
- [ ] All manual tests completed
- [ ] Lighthouse score ≥ 95
- [ ] axe DevTools: 0 violations
- [ ] QA Engineer approval

---

## Phase 4: Final Review & Merge

### Pre-Merge Checklist

- [ ] All code changes reviewed
- [ ] No TypeScript errors: `npm run type-check`
- [ ] No lint errors: `npm run lint`
- [ ] No test failures: `npm run test`
- [ ] All E2E tests passing
- [ ] Accessibility audit passing

### Merge Requirements

1. **Branch:** Feature branch → main
2. **PR Title:** `feat(a11y): implement dark/light mode and fix button contrast [UNIA-106]`
3. **Description:** Include:
   - Summary of changes
   - Link to UNIA-106-QA-REPORT.md
   - Testing completed
   - Breaking changes (if any): None expected

4. **Approval:** Require QA Engineer sign-off

### Post-Merge

- [ ] Monitor production for issues (24 hours)
- [ ] Verify theme works on deployed version
- [ ] Check analytics for button click rates
- [ ] Get stakeholder feedback

---

## QA Sign-Off

### Ready for Implementation? ✅ YES

**Current Status:**
- QA analysis complete
- Issues documented
- Test suite created
- Clear implementation path provided
- All blockers identified

**Go/No-Go:** **GO** ✅

### Implementation Support

QA Engineer available for:
- [ ] Answering implementation questions
- [ ] Running tests during development
- [ ] Validating fixes
- [ ] Final sign-off

**Contact:** John (QA Engineer)  
**Availability:** During business hours  
**Expected Timeline:** 1-2 days for complete implementation + testing

---

## Appendix: Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production

# Testing
npm run test             # Run unit tests
npm run test:ui          # Run tests with UI
npm run test:e2e         # Run E2E tests
npm run test:e2e -- --ui # E2E tests with UI

# Validation
npm run validate:contrast # Check button contrast (WCAG AA)
npm run lint             # Check for linting errors
npm run type-check       # Check TypeScript types
npm run format           # Auto-format code

# Accessibility
npm run audit:lighthouse # Run Lighthouse audit
```

---

## Related Documentation

- 📄 [UNIA-106-QA-REPORT.md](./UNIA-106-QA-REPORT.md) — Detailed QA findings
- 📄 [ACCESSIBILITY-REMEDIATION.md](./ACCESSIBILITY-REMEDIATION.md) — Implementation guide
- 📄 [ACCESSIBILITY-TESTING-GUIDE.md](./ACCESSIBILITY-TESTING-GUIDE.md) — Testing procedures
- 🔗 [Theme & Contrast E2E Tests](../e2e/theme-and-contrast.spec.ts) — Automated validation
- 🔗 [Contrast Validation Script](../scripts/validate-contrast.js) — Contrast ratio checker

---

**QA Approval:** ✅ John — QA Engineer  
**Date:** 2026-04-14  
**Status:** Ready for Development Implementation
