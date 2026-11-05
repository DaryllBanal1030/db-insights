/* =============================================================================
   generate-images.mjs — one-off generator for the OG image + apple-touch-icon.
   =============================================================================
   Run with:  node scripts/generate-images.mjs   (from the portfolio/ folder)
   Re-run this if you want to tweak the social-share image or the iOS icon.

   - og.png (the social-share image) is drawn by headless Microsoft Edge or
     Google Chrome, the same approach as dbinsights-brand/templates/
     build_carousel.py. A browser can load Space Grotesk straight from the
     site's own font package, so the image matches the site exactly without
     installing the font on your computer. If neither browser is found it
     falls back to sharp, which can only use installed fonts.
   - apple-touch-icon.png is rendered by sharp from public/favicon.svg (a copy
     of the brand's app-icon.svg); update that file first if the icon changes.
============================================================================= */

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

// The headline font file from the site's own @fontsource package.
const FONT_FILE = join(
  __dirname, "..", "node_modules", "@fontsource-variable", "space-grotesk",
  "files", "space-grotesk-latin-wght-normal.woff2",
);
const FONT = "'Space Grotesk', sans-serif";
const BROWSERS = [
  String.raw`C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`,
  String.raw`C:\Program Files\Google\Chrome\Application\chrome.exe`,
];

// Palette: the Masterbrand navy + white, and the four Sub-brand Accents
// (BRAND-GUIDE.md "Colour"; same values as global.css).
const NAVY = "#0B1B39";
const WHITE = "#FFFFFF";
const MUTED = "#AAB7CD";
const GOLD = "#F5B700"; // Insight Gold: the one thing to remember + corner accents

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
// Navy card styled like a carousel cover slide (dbinsights-brand/templates):
// gold corner accents top-left and bottom-right, Solid Mark + "db insights"
// wordmark, the tagline, and the bio line with "Data and maps" as the one
// Insight Gold highlight (gold = the Masterbrand's highlight colour).
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
  <text x="190" y="186" font-family="${FONT}" font-size="72" font-weight="700" letter-spacing="-0.7" fill="${WHITE}">db insights</text>

  <!-- tagline -->
  <text x="82" y="330" font-family="${FONT}" font-size="26" font-weight="600" letter-spacing="6" fill="${MUTED}">DATA • PLACES • BETTER DECISIONS</text>

  <!-- bio line -->
  <text x="80" y="420" font-family="${FONT}" font-size="50" font-weight="700" fill="${WHITE}"><tspan fill="${GOLD}">Data and maps</tspan> of the Philippines,</text>
  <text x="80" y="484" font-family="${FONT}" font-size="50" font-weight="700" fill="${WHITE}">by Daryll Banal.</text>

  <!-- corner accents (same geometry as the templates: 34% of a square) -->
  <path d="M0 0H62L0 62Z" fill="${GOLD}"/>
  <path d="M1200 630H1138L1200 568Z" fill="${GOLD}"/>
</svg>`;

// ---- apple-touch-icon: 180 x 180 ------------------------------------------
// The app icon from dbinsights-brand/logo/app-icon.svg (white Solid Mark on a
// navy tile), copied as-is. iOS rounds the corners itself, but the tile's own
// rounding is harmless.
const iconSvg = readFileSync(join(publicDir, "favicon.svg"), "utf8");

// Render og.png in a headless browser so Space Grotesk loads from FONT_FILE.
const browser = BROWSERS.find((b) => existsSync(b));
const ogOut = join(publicDir, "og.png");
if (browser) {
  const html = `<!doctype html><meta charset="utf-8"><style>
    @font-face { font-family: "Space Grotesk"; font-weight: 300 700;
      src: url("${pathToFileURL(FONT_FILE).href}") format("woff2"); }
    html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; }
    svg { display: block; }
  </style>${ogSvg}`;
  const htmlFile = join(tmpdir(), "dbinsights-og.html");
  writeFileSync(htmlFile, html);
  execFileSync(browser, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars",
    "--virtual-time-budget=5000", "--window-size=1200,630",
    `--screenshot=${ogOut}`, pathToFileURL(htmlFile).href,
  ], { stdio: "ignore" });
} else {
  console.warn("No Edge/Chrome found: drawing og.png with sharp and installed fonts.");
  await sharp(Buffer.from(ogSvg)).png().toFile(ogOut);
}
await sharp(Buffer.from(iconSvg))
  .resize(180, 180)
  .png()
  .toFile(join(publicDir, "apple-touch-icon.png"));

console.log("Wrote public/og.png (1200x630) and public/apple-touch-icon.png (180x180)");
