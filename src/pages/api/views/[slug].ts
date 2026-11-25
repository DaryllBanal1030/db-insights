/* =============================================================================
   /api/views/[slug] — how many times a post has been viewed.
   =============================================================================
   The one server route on the site (everything else is static HTML). It runs
   as a small Vercel function because of `prerender = false` below.

     GET  /api/views/<post-id>   -> { "views": 123 }   (just read)
     POST /api/views/<post-id>   -> { "views": 124 }   (count one view, read)

   The post page (ViewCount.astro) sends one POST per browser per post per
   day, so refreshing doesn't inflate the number. Only counts are stored:
   no names, no IP addresses, no cookies. Nobody can see WHO viewed a post.

   STORAGE: an Upstash Redis database, connected to the Vercel project from
   the Vercel dashboard (Storage -> Upstash Redis -> Connect to project).
   Connecting it adds the env vars this file reads. Until it's connected the
   route answers { "views": null } and the page simply shows no count.
   During `npm run dev` with no database it counts in memory instead, so the
   counter can be tried locally (the numbers reset when the server restarts).
============================================================================= */

import type { APIRoute } from "astro";
import { Redis } from "@upstash/redis";
import { getCollection } from "astro:content";

export const prerender = false;

// The Vercel/Upstash integration names its env vars one of two ways,
// depending on when the database was created; accept either.
const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

// Dev-only stand-in when no database is connected.
const memory = new Map<string, number>();
const useMemory = !redis && import.meta.env.DEV;

// Crawlers and link-preview bots don't count as views.
const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse/i;

const key = (slug: string) => `views:${slug}`;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

/** Only real, published posts get a counter (stops made-up slugs filling the database). */
async function isPost(slug: string): Promise<boolean> {
  const posts = await getCollection("posts", (post) => !post.data.draft);
  return posts.some((post) => post.id === slug);
}

async function read(slug: string): Promise<number | null> {
  if (redis) return (await redis.get<number>(key(slug))) ?? 0;
  if (useMemory) return memory.get(slug) ?? 0;
  return null;
}

async function bump(slug: string): Promise<number | null> {
  if (redis) return await redis.incr(key(slug));
  if (useMemory) {
    const next = (memory.get(slug) ?? 0) + 1;
    memory.set(slug, next);
    return next;
  }
  return null;
}

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug ?? "";
  if (!(await isPost(slug))) return json({ error: "not found" }, 404);
  try {
    return json({ views: await read(slug) });
  } catch {
    return json({ views: null });
  }
};

export const POST: APIRoute = async ({ params, request }) => {
  const slug = params.slug ?? "";
  if (!(await isPost(slug))) return json({ error: "not found" }, 404);
  try {
    const isBot = BOT.test(request.headers.get("user-agent") ?? "");
    return json({ views: isBot ? await read(slug) : await bump(slug) });
  } catch {
    return json({ views: null });
  }
};
