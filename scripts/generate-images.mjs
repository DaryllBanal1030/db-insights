/* =============================================================================
   generate-images.mjs — one-off generator for the OG image + apple-touch-icon.
   =============================================================================
   Run with:  node scripts/generate-images.mjs   (from the portfolio/ folder)
   Renders the SVGs below to PNG using sharp (already a dependency of Astro).
   Re-run this if you want to tweak the social-share image or the iOS icon.
   The iOS icon is rendered from public/favicon.svg (a copy of the brand's
   app-icon.svg), so update that file first if the app icon ever changes.
   Note: sharp draws text with the fonts installed on YOUR computer, so if
   Plus Jakarta Sans isn't installed it falls back to a plain sans-serif.
============================================================================= */

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFileSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

// Palette: the Masterbrand navy + white, and the four Sub-brand Accents
// (BRAND-GUIDE.md "Colour"; same values as global.css).
const NAVY = "#0B1B39";
const WHITE = "#FFFFFF";
const MUTED = "#AAB7CD";
const ACCENTS = ["#2DD4BF", "#F5B700", "#8B7CF6", "#FF6B5B"]; // Spatial, Analytics, Automate, Learning

// The Solid Mark's shapes, copied verbatim from
// dbinsights-brand/logo/brand-mark.svg (never redraw the mark). Its own
// coordinate box is 305.446 x 490.983 units, centred on (0, 0) before the
// slant. `markAt` places it at (x, y) = top-left, `height` px tall.
const MARK_SHAPES = `
  <g transform="skewX(-13.283)">
    <path fill-rule="evenodd" d="M19.098 -100H-42.705A100 100 0 0 0 -42.705 100H19.098ZM-19.098 -61.803H-42.705A61.803 61.803 0 0 0 -42.705 61.803H-19.098Z"/>
    <g transform="rotate(180 0 61.803)"><path fill-rule="evenodd" d="M19.098 -100H-42.705A100 100 0 0 0 -42.705 100H19.098ZM-19.098 -61.803H-42.705A61.803 61.803 0 0 0 -42.705 61.803H-19.098Z"/></g>
    <rect x="-19.098" y="-223.607" width="38.197" height="447.214"/>
    <circle cx="-61.803" cy="0" r="23.607"/>
  </g>`;
const markAt = (x, y, height, fill) => {
  const scale = height / 490.983;
  return `<g fill="${fill}" transform="translate(${x + 167.313 * scale} ${y + 245.492 * scale}) scale(${scale})">${MARK_SHAPES}</g>`;
};

// ---- Open Graph image: 1200 x 630 -----------------------------------------
// Navy card: Solid Mark + "db insights" wordmark, the tagline, the bio line,
// and a strip of the four Sub-brand Accents along the bottom.
const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M56 0H0V56" fill="none" stroke="#FFFFFF" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="${NAVY}"/>
  <rect width="1200" height="630" fill="url(#grid)"/>

  <!-- lockup: Solid Mark + wordmark -->
  ${markAt(80, 96, 120, WHITE)}
  <text x="190" y="186" font-family="'Plus Jakarta Sans', sans-serif" font-size="72" font-weight="700" letter-spacing="-0.7" fill="${WHITE}">db insights</text>

  <!-- tagline -->
  <text x="82" y="330" font-family="'Plus Jakarta Sans', sans-serif" font-size="26" font-weight="600" letter-spacing="6" fill="${MUTED}">DATA • PLACES • BETTER DECISIONS</text>

  <!-- bio line -->
  <text x="80" y="420" font-family="'Plus Jakarta Sans', sans-serif" font-size="50" font-weight="700" fill="${WHITE}">Data and maps of the Philippines,</text>
  <text x="80" y="484" font-family="'Plus Jakarta Sans', sans-serif" font-size="50" font-weight="700" fill="${WHITE}">by Daryll Banal.</text>

  <!-- Sub-brand Accent strip -->
  ${ACCENTS.map((c, i) => `<rect x="${i * 300}" y="618" width="300" height="12" fill="${c}"/>`).join("")}
</svg>`;

// ---- apple-touch-icon: 180 x 180 ------------------------------------------
// The app icon from dbinsights-brand/logo/app-icon.svg (white Solid Mark on a
// navy tile), copied as-is. iOS rounds the corners itself, but the tile's own
// rounding is harmless.
const iconSvg = readFileSync(join(publicDir, "favicon.svg"), "utf8");

await sharp(Buffer.from(ogSvg)).png().toFile(join(publicDir, "og.png"));
await sharp(Buffer.from(iconSvg))
  .resize(180, 180)
  .png()
  .toFile(join(publicDir, "apple-touch-icon.png"));

console.log("Wrote public/og.png (1200x630) and public/apple-touch-icon.png (180x180)");
