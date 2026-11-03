/* =============================================================================
   content.config.ts — Astro content collections (the "database" of the site)
   =============================================================================

   WHAT IS A CONTENT COLLECTION?
   A collection is a folder of content files (here: Markdown) that share a
   schema. Think of it like a typed table: each .md file is a row, and the
   frontmatter (the `---` block at the top) holds the columns. Astro validates
   every file against the zod schema below at build time — if a file is missing
   a required field or has the wrong type, the build fails with a clear error.

   WHY THIS MATTERS FOR YOU:
   Adding a new project (or credential) is just dropping a new .md file into the
   right folder. No component or layout edits. The carousel and the credentials
   grid call getCollection() and render whatever they find.

   - `glob()` is the "loader": it tells Astro which files belong to the
     collection (all .md files under the given base folder).
   - `z` is Zod, a schema/validation library Astro re-exports for us.
============================================================================= */

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { FORMATS, SUB_BRAND_KEYS } from "./lib/hub";

// POSTS — every Hub post (Map Breakdown, Data Story, Field Note…), all in one
// folder: src/content/posts/. A new post = one new .md file there. Its
// `format` decides which section it shows up in (see FORMAT_SECTION in
// src/lib/hub.ts), so there's no folder-per-section to keep in sync.
//
// The pattern "**/[^_]*.md" means "every .md file whose name does NOT start
// with an underscore". That lets src/content/posts/_TEMPLATE.md sit in the
// folder as a copy-me example without being published.
//
// Until the first real post exists, `npm run build` prints "The collection
// "posts" does not exist or is empty". That's expected and harmless; the
// section pages show their coming-soon state instead.
const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    // `z.coerce.date()` turns the frontmatter text "2026-11-09" into a real
    // Date object, so we can sort posts and format the date nicely.
    date: z.coerce.date(),
    // Must be one of the Post Formats in src/lib/hub.ts (e.g. "Data Story").
    format: z.enum(FORMATS),
    // One or two sentences, shown in post lists and as the SEO description.
    summary: z.string(),
    // Only for Field Notes: which Sub-brand Tag to show (optional). Other
    // formats get their Tag from their section automatically.
    subBrand: z.enum(SUB_BRAND_KEYS).optional(),
    // The Public Source(s) the post is built from, e.g. "PSA CPI (2018=100)".
    source: z.string().optional(),
    // Link to the original post on LinkedIn (the Home Platform).
    linkedinUrl: z.string().url().optional(),
    // `draft: true` keeps a post out of the built site while you work on it.
    draft: z.boolean().default(false),
  }),
});

// PROJECTS — each becomes a card in the featured-work carousel.
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    // Drives the status badge. Only these three values are allowed.
    status: z.enum(["Live", "In progress", "Concept"]),
    // The brief 1–2 sentence blurb shown on the card.
    summary: z.string(),
    // Tech tags rendered as mono pills.
    tags: z.array(z.string()),
    // The project's own external site. `.url()` enforces a valid URL.
    liveUrl: z.string().url(),
    // Optional repo link — the "Code ↗" button only renders when this exists.
    repoUrl: z.string().url().optional(),
    // Whether this project appears in the carousel.
    featured: z.boolean(),
    // Carousel sort order (ascending).
    order: z.number(),
  }),
});

// CREDENTIALS — rendered as one flat grid in the Credentials section (step 6).
// Defined here now so the schema lives in one place.
const credentials = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/credentials" }),
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    // Kept as a string so values like "2025" or "2021–2025" both work.
    year: z.string(),
    // Optional short label, e.g. "DataCamp" or "CSE".
    tag: z.string().optional(),
    // Optional "Verify ↗" link.
    verifyUrl: z.string().url().optional(),
    order: z.number(),
  }),
});

// Register the collections so `getCollection("projects")` etc. work.
export const collections = { posts, projects, credentials };
