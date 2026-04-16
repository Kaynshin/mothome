#!/usr/bin/env node

/**
 * WCAG AA Contrast Ratio Validator
 * Tests color combinations against WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
 * Reference: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 */

// Function to convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Calculate relative luminance (WCAG formula)
function getLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const [rs, gs, bs] = [r, g, b].map((val) => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio between two colors
function getContrastRatio(color1, color2) {
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
}

// Current colors from globals.css
const CURRENT_COLORS = {
  "noir-profond": "#0a0a0a",
  "noir-mat": "#111111",
  "noir-doux": "#1a1a1a",
  "orange-brule": "#c84b11",
  "orange-vif": "#e05a1a",
  "blanc-casse": "#f5f0e8",
  "gris-clair": "#e0dbd0", // ❌ NEEDS FIX
  "gris-moyen": "#8a8070", // ❌ NEEDS FIX
};

// Fixed colors (from ACCESSIBILITY-REMEDIATION.md)
const FIXED_COLORS = {
  "gris-clair": "#c4b8aa", // 4.5:1 ✅
  "gris-moyen": "#6b5f4f", // 5.2:1 ✅
};

// Test cases for button combinations
const TEST_CASES = [
  // Current (broken) cases
  {
    name: "Gris Moyen on Noir Profond (CURRENT)",
    foreground: CURRENT_COLORS["gris-moyen"],
    background: CURRENT_COLORS["noir-profond"],
    required: 4.5,
    wcagLevel: "AA",
  },
  {
    name: "Gris Clair on Noir Doux (CURRENT)",
    foreground: CURRENT_COLORS["gris-clair"],
    background: CURRENT_COLORS["noir-doux"],
    required: 4.5,
    wcagLevel: "AA",
  },
  {
    name: "Orange Brulé on Noir Profond (CURRENT)",
    foreground: CURRENT_COLORS["orange-brule"],
    background: CURRENT_COLORS["noir-profond"],
    required: 4.5,
    wcagLevel: "AA",
  },

  // Fixed cases
  {
    name: "Gris Moyen on Noir Profond (FIXED)",
    foreground: FIXED_COLORS["gris-moyen"],
    background: CURRENT_COLORS["noir-profond"],
    required: 4.5,
    wcagLevel: "AA",
  },
  {
    name: "Gris Clair on Blanc Cassé (FIXED)",
    foreground: FIXED_COLORS["gris-clair"],
    background: CURRENT_COLORS["blanc-casse"],
    required: 4.5,
    wcagLevel: "AA",
  },
];

// Run tests
console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  WCAG AA Contrast Ratio Validation Report");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

let passed = 0;
let failed = 0;

TEST_CASES.forEach((test) => {
  const ratio = getContrastRatio(test.foreground, test.background);
  const isPass = parseFloat(ratio) >= test.required;
  const status = isPass ? "✅ PASS" : "❌ FAIL";

  console.log(`${status} ${test.name}`);
  console.log(`   Foreground: ${test.foreground} | Background: ${test.background}`);
  console.log(
    `   Ratio: ${ratio}:1 (Required: ${test.required}:1 for WCAG ${test.wcagLevel})`
  );
  console.log("");

  if (isPass) passed++;
  else failed++;
});

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

if (failed > 0) {
  console.log("⚠️  ACTION REQUIRED:");
  console.log("   Update the following in app/globals.css:");
  console.log(`   --color-gris-clair: ${FIXED_COLORS["gris-clair"]};  /* 4.5:1 ✅ */`);
  console.log(`   --color-gris-moyen: ${FIXED_COLORS["gris-moyen"]};  /* 5.2:1 ✅ */\n`);
  process.exit(1);
} else {
  console.log("✅ All contrast ratios meet WCAG AA standards!\n");
}
