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
export const collections = { projects, credentials };
