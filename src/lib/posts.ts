/* =============================================================================
   posts.ts — small helpers for reading the `posts` content collection.
   =============================================================================
   Pages call these instead of `getCollection("posts")` directly, so the rules
   "hide drafts", "newest first" and "a post's Format decides its section"
   live in one place.
============================================================================= */

import { getCollection, type CollectionEntry } from "astro:content";
import { FORMAT_SECTION, SECTIONS, type Section, type SectionKey } from "./hub";

export type Post = CollectionEntry<"posts">;

/** The section a post belongs to, decided by its Format. */
export function sectionOf(post: Post): SectionKey {
  return FORMAT_SECTION[post.data.format];
}

/**
 * The Sub-brand Tag to show on a post, or `null` for a Masterbrand post
 * (a Field Note with no `subBrand`).
 */
export function tagOf(post: Post): Section | null {
  const key = sectionOf(post);
  if (key !== "notes") return SECTIONS[key];
  return post.data.subBrand ? SECTIONS[post.data.subBrand] : null;
}

/**
 * The CSS that colours a post's highlights and bullets in its Sub-brand
 * Accent, e.g. "--hl: var(--color-spatial); --post-accent: var(--color-spatial)".
 * A Masterbrand post (no tag) returns undefined: highlights stay Insight Gold
 * and bullets use the white/navy ink.
 */
export function accentStyleOf(post: Post): string | undefined {
  const tag = tagOf(post);
  if (!tag) return undefined;
  return `--hl: var(--color-${tag.key}); --post-accent: var(--color-${tag.key})`;
}

/**
 * Splits a title with ==highlight== marks into plain and highlighted parts,
 * so a component can wrap the highlighted part in <mark class="insight">.
 * "Where ==most Filipinos== live" ->
 *   [{text:"Where ", hl:false}, {text:"most Filipinos", hl:true}, {text:" live", hl:false}]
 */
export function titleParts(title: string): { text: string; hl: boolean }[] {
  return title
    .split(/(==[^=]+?==)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("==") && part.endsWith("==")
        ? { text: part.slice(2, -2), hl: true }
        : { text: part, hl: false },
    );
}

/** The title with the == marks removed, for <title> tags and SEO. */
export function plainTitle(title: string): string {
  return title.replace(/==([^=]+?)==/g, "$1");
}

/** The post's own page, e.g. "/analytics/2026-11-11-what-1000-pesos-bought". */
export function urlOf(post: Post): string {
  return `${SECTIONS[sectionOf(post)].path}/${post.id}`;
}

/**
 * Published posts (no drafts), newest first. Pass a section key to get only
 * that section's posts.
 */
export async function getPosts(section?: SectionKey): Promise<Post[]> {
  // getCollection's second argument is a filter function, run on every entry.
  const posts = await getCollection(
    "posts",
    (post) => !post.data.draft && (!section || sectionOf(post) === section),
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** "Mon Nov 9, 2026" — the date style used across the brand docs. */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Manila",
  });
}
