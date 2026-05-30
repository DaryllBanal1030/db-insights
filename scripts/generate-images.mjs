/* =============================================================================
   generate-images.mjs — one-off generator for the OG image + apple-touch-icon.
   =============================================================================
   Run with:  node scripts/generate-images.mjs   (from the portfolio/ folder)
   Renders the SVGs below to PNG using sharp (already a dependency of Astro).
   Re-run this if you want to tweak the social-share image or the iOS icon.
============================================================================= */

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

// Palette (matches the dark theme in global.css).
const BG = "#0A0C12";
const SURFACE = "#11151E";
const BORDER = "#232C39";
const TEXT = "#EAEEF5";
const MUTED = "#9AA4B4";
const ACCENT = "#2DD4BF";

// ---- Open Graph image: 1200 x 630 -----------------------------------------
const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M56 0H0V56" fill="none" stroke="#FFFFFF" stroke-opacity="0.04" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="${BG}"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <!-- accent hairline at top -->
  <rect x="0" y="0" width="1200" height="6" fill="${ACCENT}"/>

  <!-- monogram -->
  <rect x="80" y="80" width="96" height="96" rx="20" fill="${SURFACE}" stroke="${BORDER}" stroke-width="2"/>
  <text x="128" y="144" text-anchor="middle" font-family="monospace" font-size="44" font-weight="700" fill="${ACCENT}">DB</text>

  <!-- eyebrow -->
  <text x="80" y="330" font-family="monospace" font-size="26" letter-spacing="4" fill="${ACCENT}">RESEARCH ANALYST · ASPIRING DATA ENGINEER</text>

  <!-- name -->
  <text x="78" y="420" font-family="sans-serif" font-size="92" font-weight="700" fill="${TEXT}">Daryll Banal</text>

  <!-- tagline -->
  <text x="80" y="486" font-family="sans-serif" font-size="34" fill="${MUTED}">I build data-driven insights and interactive dashboards.</text>
</svg>`;

// ---- apple-touch-icon: 180 x 180 ------------------------------------------
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="40" fill="${BG}"/>
  <rect x="6" y="6" width="168" height="168" rx="36" fill="none" stroke="${BORDER}" stroke-width="4"/>
  <text x="90" y="96" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-size="74" font-weight="700" fill="${ACCENT}">DB</text>
</svg>`;

await sharp(Buffer.from(ogSvg)).png().toFile(join(publicDir, "og.png"));
await sharp(Buffer.from(iconSvg))
  .png()
  .toFile(join(publicDir, "apple-touch-icon.png"));

console.log("Wrote public/og.png (1200x630) and public/apple-touch-icon.png (180x180)");
