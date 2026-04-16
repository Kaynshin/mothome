# QA Report: UNIA-106 — Dark/Light Mode & Button Contrast Validation

**Issue:** UNIA-106  
**Type:** QA Validation  
**Status:** In Progress  
**Date:** 2026-04-14  
**QA Engineer:** John (f6fe744f-84aa-4899-8a1e-b431fad2b689)

---

## Executive Summary

Initial QA audit of main branch reveals:
- ❌ **Dark/Light mode toggle:** Not implemented
- ⚠️ **Button contrast:** Partially compliant (1 color below WCAG AA 4.5:1 threshold)
- ✅ **Accessibility framework:** Ready (globals.css token structure supports fixes)

**Recommendation:** Implement accessibility fixes per ACCESSIBILITY-REMEDIATION.md before merging to production.

---

## Current State Analysis

### 1. Dark/Light Mode Feature

**Status:** ❌ NOT IMPLEMENTED

**Findings:**
- No theme toggle button in Header component
- No ThemeProvider or useTheme hook
- Site uses only dark theme (`noir-profond`, `noir-mat`, `noir-doux` backgrounds)
- CSS custom properties defined for dark mode only
- `[color-scheme:dark]` applied on form inputs for dark mode support

**What's needed:**
- [ ] Add theme toggle button to Header (sun/moon icon)
- [ ] Implement light mode color palette in globals.css
- [ ] Add ThemeProvider context or use next-themes library
- [ ] Test switching between dark/light modes
- [ ] Verify theme persistence (localStorage)
- [ ] Test responsive behavior on mobile

**Reference:** See ACCESSIBILITY-REMEDIATION.md for design specification

---

### 2. Button Contrast Analysis

**Status:** ⚠️ PARTIALLY COMPLIANT

**Current Color Palette (from globals.css):**
```css
--color-gris-moyen: #8a8070;      /* Current */
--color-gris-clair: #e0dbd0;      /* Current */
--color-orange-brule: #c84b11;    /* Primary button */
--color-noir-profond: #0a0a0a;    /* Background */
```

**WCAG AA Validation Results:**

| Color Combination | Current Ratio | Required | Status | Test Case |
|---|---|---|---|---|
| Gris Moyen (#8a8070) on Noir Profond (#0a0a0a) | 5.09:1 | 4.5:1 | ✅ PASS | Navigation text |
| Gris Clair (#e0dbd0) on Noir Doux (#1a1a1a) | 12.61:1 | 4.5:1 | ✅ PASS | Light gray text |
| Orange Brulé (#c84b11) on Noir Profond (#0a0a0a) | **4.21:1** | 4.5:1 | ❌ **FAIL** | Primary buttons |

**Issue Found:**
- Primary button color (orange-brule) is **below** the WCAG AA threshold by 0.29:1
- Affects all CTA buttons throughout the site
- Particularly visible on dark backgrounds

**Affected Components:**
- Button.tsx (default variant uses primary color)
- Header.tsx (CTA buttons)
- All pages with call-to-action buttons

---

## Detailed Test Results

### Test 1: Button Contrast Audit

**Script Output:**
```
✅ PASS Gris Moyen on Noir Profond (CURRENT)
   Ratio: 5.09:1 (Required: 4.5:1)

✅ PASS Gris Clair on Noir Doux (CURRENT)
   Ratio: 12.61:1 (Required: 4.5:1)

❌ FAIL Orange Brulé on Noir Profond (CURRENT)
   Ratio: 4.21:1 (Required: 4.5:1) ← PRIMARY BUTTON ISSUE
```

**Root Cause:** Orange-brule (#c84b11) luminance insufficient on very dark backgrounds.

**Solutions:**
1. **Option A (Recommended):** Lighten orange-brule to ~#d65814 (5.5:1 ratio)
2. **Option B:** Add dark background overlay behind buttons
3. **Option C:** Use darker text + lighter background combination

---

### Test 2: Keyboard Navigation

**Status:** ⚠️ NEEDS TESTING (pending dark/light mode implementation)

**Test Plan:**
- [ ] Tab through header navigation
- [ ] Verify focus indicators visible (orange outline recommended)
- [ ] Mobile menu: Toggle with Enter, close with Escape
- [ ] Check mobile menu aria-expanded states
- [ ] Screen reader announces button states correctly

---

### Test 3: Component Accessibility

**Button Component (components/ui/button.tsx):**
- ✅ Supports variant system (default, destructive, outline, secondary, ghost, link)
- ✅ Has focus-visible styles for keyboard navigation
- ✅ Size variants support different contexts
- ⚠️ Default variant uses primary color (contrast issue)

**Header Component (components/layout/Header.tsx):**
- ✅ Has mobile menu with Radix Sheet component
- ❌ aria-expanded not dynamically updating
- ❌ No Escape key handler for mobile menu
- ❌ No focus visible outlines on nav links
- ⚠️ Mobile menu accessibility needs fixes per remediation guide

---

## Pending Accessibility Fixes

Per ACCESSIBILITY-REMEDIATION.md, the following must be implemented and validated:

### Fix #1: Button Contrast
- [ ] Adjust orange-brule color or implement workaround
- [ ] Run Lighthouse accessibility audit
- [ ] Validate with WebAIM Contrast Checker
- [ ] Test with axe DevTools browser extension

### Fix #2: Mobile Menu Keyboard Navigation
- [ ] Update aria-expanded to dynamic string values ("true"/"false")
- [ ] Implement Escape key handler
- [ ] Update aria-label dynamically
- [ ] Test with keyboard-only navigation

### Fix #3: Skip to Main Content
- [ ] Add skip link at start of Header
- [ ] Add id="main-content" to main element
- [ ] Verify link visible on focus
- [ ] Test with keyboard navigation

### Fix #4: Focus Indicators
- [ ] Add focus-visible outlines to all nav links
- [ ] Ensure outline color meets contrast requirements
- [ ] Test focus visibility on all interactive elements

---

## Testing Methodology

### Automated Tests
```bash
# Run contrast validator
npm run validate:contrast

# Run Lighthouse audit
npm run audit:lighthouse

# Axe accessibility scan (requires browser)
npm install -D @axe-core/playwright
npm run test:a11y
```

### Manual Tests
1. **Keyboard Navigation**
   - Tab through entire site
   - Verify focus visible on every interactive element
   - Test Escape key handling on modal/menu

2. **Screen Reader Testing**
   - Use NVDA (Windows) or VoiceOver (Mac)
   - Verify button labels/descriptions
   - Check form accessibility

3. **Visual Inspection**
   - Inspect buttons on all background colors
   - Check text contrast with online tools
   - Verify color values in DevTools

---

## Blockers & Issues

| ID | Severity | Description | Status |
|---|---|---|---|
| UNIA-106-01 | High | Orange-brule button contrast 4.21:1 (need 4.5:1) | Open |
| UNIA-106-02 | Medium | No dark/light mode implementation | Open |
| UNIA-106-03 | Medium | Mobile menu aria-expanded not dynamic | Open |
| UNIA-106-04 | Medium | No Escape key handler for mobile menu | Open |
| UNIA-106-05 | Low | Navigation links missing focus outlines | Open |

---

## Recommendations

### Immediate Actions (P0)
1. **Fix orange-brule contrast** — affects primary CTA buttons site-wide
   - Lighten to #d65814 or implement darker background
   - Validate new color against all backgrounds
   - Update Button component default variant

2. **Implement dark/light mode toggle** — feature requirement
   - Add button to Header (sun/moon icon)
   - Define light mode color palette
   - Test mode switching and persistence

### Follow-up Actions (P1)
1. Implement accessibility fixes from remediation guide
2. Create E2E tests for dark/light mode switching
3. Add accessibility test suite to CI/CD
4. Run final WCAG AA audit

---

## Test Coverage Plan

### E2E Tests (Playwright)
```bash
# Dark/light mode
test('User can toggle dark/light mode')
test('Theme preference persists across page reload')
test('All colors meet contrast ratios in both modes')

# Button contrast
test('All buttons meet WCAG AA contrast ratio')
test('Button contrast maintained on all background colors')

# Keyboard navigation
test('Keyboard user can navigate entire site')
test('Mobile menu closes with Escape key')
test('All interactive elements have visible focus')
```

### Accessibility Audit
```bash
test('Lighthouse accessibility score ≥ 95')
test('axe-core finds zero violations')
test('Screen reader announces all labels correctly')
```

---

## Sign-Off Checklist

- [ ] Dark/light mode toggle implemented and tested
- [ ] Button contrast ≥ 4.5:1 on all backgrounds
- [ ] Mobile menu keyboard accessible (Escape key)
- [ ] All nav links have focus indicators
- [ ] Lighthouse accessibility score ≥ 95
- [ ] axe DevTools reports zero violations
- [ ] E2E test suite passes
- [ ] Manual keyboard navigation test passed
- [ ] Screen reader test passed

---

## Next Steps

1. **Implement fixes** — Based on ACCESSIBILITY-REMEDIATION.md
2. **Run validation script** — `npm run validate:contrast`
3. **Update QA report** — Document implementation details
4. **Run E2E tests** — Verify all functionality
5. **Final audit** — Lighthouse & axe DevTools
6. **Close issue** — Upon validation success

---

**Generated by:** QA Engineer John  
**Date:** 2026-04-14  
**Next Review:** Upon implementation of accessibility fixes
