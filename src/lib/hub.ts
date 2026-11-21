/* =============================================================================
   hub.ts — the facts about the DB Insights Hub, in ONE place.
   =============================================================================
   Every page, the nav, the home-page cards and the post pages read from here,
   so renaming a section, moving a Phase date or turning on a follow link is a
   one-line edit in this file. Terms (Sub-brand, Phase, Post Format…) are the
   ones defined in dbinsights-brand/CONTEXT.md.

   This is a plain TypeScript module, not an Astro component. Astro components
   import it in their frontmatter (the `---` block), so it only runs at build
   time and none of it ships to the browser.
============================================================================= */

// ---------------------------------------------------------------------------
// Hub sections
// ---------------------------------------------------------------------------

/** The five Hub sections, each served at `/<key>` (e.g. /spatial). */
export const SECTION_KEYS = [
  "spatial",
  "analytics",
  "automate",
  "learning",
  "notes",
] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

/** The four Sub-brands. Field Notes (`notes`) is a section but not a Sub-brand. */
export const SUB_BRAND_KEYS = ["spatial", "analytics", "automate", "learning"] as const;
export type SubBrandKey = (typeof SUB_BRAND_KEYS)[number];

export interface Section {
  key: SectionKey;
  /** URL path, e.g. "/spatial". */
  path: string;
  /** Display name, e.g. "DBSpatial". */
  name: string;
  /** Short nav label, e.g. "Spatial". */
  navLabel: string;
  /** One line on what the section covers. */
  focus: string;
  /** The Post Formats published here. */
  formats: string[];
  /** The Phase in which this section starts (1, 2 or 3). */
  phase: 1 | 2 | 3;
  /** When the first post lands, in words. */
  starts: string;
  /** The same date as YYYY-MM-DD, so the site can tell if it has passed. */
  startsOn: string;
  /** The same, short enough for a small chip, e.g. "Jan 2027". */
  startsShort: string;
  /**
   * Tailwind classes for the section's colour. Sub-brands use their
   * Sub-brand Accent; Field Notes use the Masterbrand ink (navy/white).
   * Written out in full on purpose: Tailwind finds class names by scanning
   * the source for complete strings, so `"bg-" + name` would NOT work.
   */
  tagClass: string;
  barClass: string;
}

export const SECTIONS: Record<SectionKey, Section> = {
  spatial: {
    key: "spatial",
    path: "/spatial",
    name: "DBSpatial",
    navLabel: "Spatial",
    focus: "Geospatial work: maps, location data and places in the Philippines.",
    formats: ["Map Breakdowns", "Map Reels"],
    phase: 1,
    starts: "Mon Nov 23, 2026",
    startsOn: "2026-11-23",
    startsShort: "Nov 23",
    tagClass: "bg-spatial text-navy",
    barClass: "bg-spatial",
  },
  analytics: {
    key: "analytics",
    path: "/analytics",
    name: "DBAnalytics",
    navLabel: "Analytics",
    focus: "Data analysis and Data Stories, each built around one chart.",
    formats: ["Data Stories"],
    phase: 1,
    starts: "Mon Nov 23, 2026",
    startsOn: "2026-11-23",
    startsShort: "Nov 23",
    tagClass: "bg-analytics text-navy",
    barClass: "bg-analytics",
  },
  automate: {
    key: "automate",
    path: "/automate",
    name: "DBAutomate",
    navLabel: "Automate",
    focus: "Automation: workflows, scripts and tools that save time.",
    formats: ["Build Logs"],
    phase: 2,
    starts: "Mon Jan 4, 2027",
    startsOn: "2027-01-04",
    startsShort: "Jan 2027",
    tagClass: "bg-automate text-navy",
    barClass: "bg-automate",
  },
  learning: {
    key: "learning",
    path: "/learning",
    name: "DBLearning",
    navLabel: "Learning",
    focus: "Upskilling: short on-camera Lessons that teach one data skill each.",
    formats: ["Lessons"],
    phase: 3,
    starts: "Mon Mar 1, 2027",
    startsOn: "2027-03-01",
    startsShort: "Mar 2027",
    tagClass: "bg-learning text-navy",
    barClass: "bg-learning",
  },
  notes: {
    key: "notes",
    path: "/notes",
    name: "Field Notes",
    navLabel: "Notes",
    focus: "Short first-person stories and lessons from Daryll's analyst work.",
    formats: ["Field Notes"],
    phase: 1,
    starts: "Mon Nov 23, 2026",
    startsOn: "2026-11-23",
    startsShort: "Nov 23",
    tagClass: "bg-accent text-on-accent",
    barClass: "bg-accent",
  },
};

/** The sections in display order, as an array (handy for `.map()`). */
export const SECTION_LIST: Section[] = SECTION_KEYS.map((key) => SECTIONS[key]);

// ---------------------------------------------------------------------------
// Post Formats → which section a post lives in
// ---------------------------------------------------------------------------

/** The Post Formats a post can use (see CONTEXT.md "Post Formats"). */
export const FORMATS = [
  "Map Breakdown",
  "Map Reel",
  "Data Story",
  "Build Log",
  "Lesson",
  "Field Note",
] as const;
export type Format = (typeof FORMATS)[number];

/**
 * A post's Format decides its section, so a post file only needs `format:`.
 * Field Notes always go to /notes; they may still carry a Sub-brand Tag
 * through the optional `subBrand` field (e.g. a DBSpatial Field Note).
 */
export const FORMAT_SECTION: Record<Format, SectionKey> = {
  "Map Breakdown": "spatial",
  "Map Reel": "spatial",
  "Data Story": "analytics",
  "Build Log": "automate",
  Lesson: "learning",
  "Field Note": "notes",
};

// ---------------------------------------------------------------------------
// The weekly rhythm (BRAND-GUIDE.md "Weekly slots")
// ---------------------------------------------------------------------------

export interface WeeklySlot {
  day: string;
  format: string;
  /** Which section's tag to show; null = Masterbrand ("DB Insights"). */
  section: SectionKey | null;
  note?: string;
}

/**
 * Mon / Wed / Fri, posted 7:30–8:00 AM Manila time. Monday and Wednesday
 * never change; Friday is the Flex Slot, which changes by Phase. Update the
 * Friday row when Phase 2 starts (Field Note / Build Log).
 */
export const WEEKLY_SLOTS: WeeklySlot[] = [
  { day: "Mon", format: "Map Breakdown", section: "spatial" },
  { day: "Wed", format: "Data Story", section: "analytics" },
  { day: "Fri", format: "Field Note", section: null, note: "Flex Slot" },
];

export const POST_TIME = "7:30 AM Manila";

// ---------------------------------------------------------------------------
// Masterbrand + follow links
// ---------------------------------------------------------------------------

export const BRAND = {
  /** Always two words. Never "DBInsights" (that's an unrelated US firm). */
  name: "DB Insights",
  tagline: "Data • Places • Better Decisions",
  /** The standard bio line from BRAND-GUIDE.md "Presence & naming". */
  bio: "DB Insights: data and maps of the Philippines, by Daryll Banal.",
  hashtag: "#DBInsightsPH",
  /** Launch date. Moved from Mon Nov 9 to Mon Nov 23, 2026 for the relaunch
   *  (Daryll, Nov 21); the Phase 1 sections above start on it too. */
  launch: "Mon Nov 23, 2026",
  launchOn: "2026-11-23",
};

export interface FollowLink {
  platform: string;
  handle: string;
  url: string;
  /** Who speaks there: Daryll in person, or the Masterbrand as a brand. */
  speaksAs: "Personal" | "Brand";
  /**
   * `null` = live now, link it. A string = not started yet; show this note
   * instead of a link. When a platform goes live, set it to `null`.
   */
  startsNote: string | null;
}

export const FOLLOW_LINKS: FollowLink[] = [
  {
    platform: "LinkedIn",
    handle: "Daryll Banal",
    url: "https://linkedin.com/in/darylllbanal/",
    speaksAs: "Personal",
    startsNote: null,
  },
  {
    platform: "Facebook",
    handle: "@dbinsightsph",
    url: "https://facebook.com/dbinsightsph",
    speaksAs: "Brand",
    startsNote: "Page starts Mon Dec 7, 2026",
  },
  {
    platform: "YouTube",
    handle: "@daryllbanal",
    url: "https://youtube.com/@daryllbanal",
    speaksAs: "Personal",
    startsNote: "Starts in Phase 3",
  },
];

// ---------------------------------------------------------------------------
// Dates
// ---------------------------------------------------------------------------

/**
 * True once a YYYY-MM-DD date (in Manila time) has arrived. Pages use it to
 * switch wording from "starts Mon Jan 4" to "live since Mon Jan 4".
 *
 * Note: the site is static, so this is checked when the site is BUILT, not
 * when someone visits. Every push to GitHub rebuilds it (e.g. when you add a
 * post), which keeps the wording current.
 */
export function hasStarted(isoDate: string, now: Date = new Date()): boolean {
  return new Date(`${isoDate}T00:00:00+08:00`).getTime() <= now.getTime();
}
