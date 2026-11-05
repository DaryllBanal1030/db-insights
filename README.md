# DB Insights Hub — daryllbanal.com

The **DB Insights Hub**: one fast, static site built with **Astro + Tailwind CSS** that will
live at **https://daryllbanal.com**. *DB Insights: data and maps of the Philippines, by Daryll Banal.*

Each Sub-brand is a section of the Hub, never a separate domain
(see `dbinsights-brand/docs/adr/0002-personal-domain-hub.md`):

| Path | Section |
| :--- | :--- |
| `/` | DB Insights overview: sections, latest posts, DBLearning preview, follow links, a short "About Daryll" |
| `/spatial` | DBSpatial: Map Breakdowns, Map Reels (Phase 1) |
| `/analytics` | DBAnalytics: Data Stories (Phase 1) |
| `/automate` | DBAutomate: Build Logs (Phase 2) |
| `/learning` | DBLearning: Lessons (Phase 3) |
| `/notes` | Field Notes (Phase 1) |
| `/about` | Daryll's portfolio: about, featured work, experience, skills, credentials, contact |

A section with no posts shows a "coming soon" state naming its Sub-brand and Phase.
Always write **DB Insights** as two words (never "DBInsights").

Replaces the previous site at `db-insights.vercel.app`.

---

## Tech stack

- **[Astro](https://astro.build)** (static output) — ships HTML/CSS with almost no JavaScript.
- **[Tailwind CSS v4](https://tailwindcss.com)** — utility CSS, configured entirely in
  `src/styles/global.css` (no `tailwind.config.js` in v4).
- **Fonts** (self-hosted via [`@fontsource`](https://fontsource.org)): **Space Grotesk** for
  headlines, labels and the lowercase "db insights" wordmark (chosen Nov 5, 2026 over Plus Jakarta
  Sans, Bricolage Grotesque, Schibsted Grotesk, Instrument Sans and Manrope), Inter for body text,
  JetBrains Mono for code only.
- **Colours**: Masterbrand navy `#0B1B39` + white, and one Sub-brand Accent per section
  (teal Spatial, amber Analytics, violet Automate, coral Learning), all in `src/styles/global.css`.
  **Highlights** mark the one thing to remember, ONE per screen. In a post's title or body, wrap it
  in `==double equals==`; in a component, use `<span class="insight">…</span>`. The colour follows
  the Sub-brand (teal DBSpatial, gold DBAnalytics, violet DBAutomate, coral DBLearning); the
  Masterbrand (home page, Field Notes without a Sub-brand) uses Insight Gold. Add `corners` to a
  card for the gold corner accents.
- **Deploy target**: Vercel (static).
- **Sitemap**: `@astrojs/sitemap` writes `sitemap-index.xml` on every build so Google can find
  every page. Nothing to maintain; new posts are added automatically.

## A few Astro concepts (for the frontend-curious)

- **Zero JS by default.** `.astro` components render to plain HTML at build time. The frontmatter
  block (between the `---` fences) runs on the server only.
- **Islands.** The few interactive bits — the **theme toggle** and the **featured-work carousel** —
  are "islands": isolated components that get a `client:*` directive so *only they* ship JS. The
  rest of the page stays static.
- **Layouts.** `src/layouts/BaseLayout.astro` is the shared shell (`<head>`, SEO/OG tags, fonts,
  nav, footer). Pages render their content into its `<slot />`.
- **Content collections.** Posts, projects and credentials live as Markdown files in
  `src/content/`, validated by zod schemas in `src/content.config.ts`. **Adding a post, a project
  or a credential = adding one `.md` file. No layout changes.**
- **Dynamic routes.** `src/pages/[section]/index.astro` builds all five section pages from one
  file, and `src/pages/[section]/[slug].astro` builds one page per post.

## Project structure

```text
portfolio/
├── public/                 # static assets served at the site root
│   ├── favicon.svg         # DB Insights app icon (copy of dbinsights-brand/logo/app-icon.svg)
│   ├── robots.txt          # lets search engines crawl everything; points to the sitemap
│   ├── resume.pdf          # ← PLACEHOLDER: drop your résumé here
│   ├── daryll.jpg          # ← PLACEHOLDER: drop your photo here
│   └── og.png              # social-share preview image
├── src/
│   ├── content.config.ts   # zod schemas for the collections
│   ├── content/
│   │   ├── posts/          # one .md per post (copy _TEMPLATE.md)
│   │   ├── projects/       # one .md per project
│   │   └── credentials/    # one .md per credential
│   ├── lib/
│   │   ├── hub.ts          # sections, Phases, Post Formats, follow links: edit wording here
│   │   └── posts.ts        # helpers for reading posts
│   ├── layouts/BaseLayout.astro
│   ├── components/         # Nav, Hero, BrandMark, SubBrandTag, sections, etc.
│   ├── styles/global.css   # design system: Tailwind + both theme palettes
│   └── pages/
│       ├── index.astro             # the home page "/"
│       ├── about.astro             # "/about", the portfolio sections
│       ├── 404.astro               # "page not found", with links back to each section
│       └── [section]/
│           ├── index.astro         # /spatial, /analytics, /automate, /learning, /notes
│           └── [slug].astro        # one page per post
└── astro.config.mjs
```

## Local development

All commands run from the `portfolio/` folder:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start the dev server at `localhost:4321`     |
| `npm run build`   | Build the production site to `./dist/`       |
| `npm run preview` | Preview the production build locally         |

## Adding content (the whole point of the hub)

**New post** → copy `src/content/posts/_TEMPLATE.md` to e.g.
`src/content/posts/2026-11-11-what-1000-pesos-bought.md` and fill it in:

```markdown
---
title: "What ₱1,000 bought in 2018 vs today"
date: 2026-11-11
format: "Data Story"      # Map Breakdown | Map Reel | Data Story | Build Log | Lesson | Field Note
summary: "One or two sentences."
subBrand: "spatial"       # Field Notes only, optional: spatial | analytics | automate | learning
source: "PSA CPI (2018=100), OpenSTAT"   # optional: the Public Source
linkedinUrl: "https://www.linkedin.com/posts/..."   # optional
draft: false
---

The post body in Markdown.
```

The `format` decides the section (a Data Story goes to `/analytics`), and the file name becomes
the URL: `/analytics/2026-11-11-what-1000-pesos-bought`. Files starting with `_` are never
published. Until the first post exists, the build prints *The collection "posts" does not exist
or is empty*; that's expected.

> If you ever delete the **only** post and it still shows up locally, delete the cache file
> `node_modules/.astro/data-store.json` and build again.

**New project** → create `src/content/projects/my-project.md`:

```markdown
---
title: "My new project"
status: "Live"            # "Live" | "In progress" | "Concept"
summary: "One or two sentences on what it is."
tags: ["Python", "DuckDB"]
liveUrl: "https://example.com"
repoUrl: "https://github.com/you/repo"   # optional
featured: true            # show it in the carousel
order: 4                  # carousel sort order
---
```

**New credential** → create `src/content/credentials/my-cert.md`:

```markdown
---
title: "Some certification"
issuer: "Some issuer"
year: "2026"
tag: "DataCamp"           # optional short label
verifyUrl: "https://..."  # optional "Verify ↗" link
order: 4
---
```

That's it — the carousel and the credentials grid pick the new file up automatically.

## Regenerating the social image + iOS icon

`public/og.png` (the social-share preview) and `public/apple-touch-icon.png` are
generated from SVG definitions in `scripts/generate-images.mjs`. To tweak and rebuild them:

```sh
node scripts/generate-images.mjs
```

## Placeholders to fill in

Unfinished placeholders are hidden from the live site until you fill them in: the photo slot
only appears once `public/daryll.jpg` exists, the two placeholder projects have
`featured: false`, and credential years and "Verify" links are commented out in their `.md` files.

- `public/resume.pdf` — your résumé (linked from the nav).
- `public/daryll.jpg` — your photo (used in the About section).
- Follow links: when the Facebook Page (Dec 7, 2026) and YouTube (Phase 3) go live, set their
  `startsNote` to `null` in `src/lib/hub.ts` so they become links.
- Each project's `liveUrl` / `repoUrl` (in `src/content/projects/*.md`).
- Each credential's `title` / `issuer` / `year` / `verifyUrl` (in `src/content/credentials/*.md`).

---

## Pointing daryllbanal.com at the site (Daryll's to-do — not done yet)

`astro.config.mjs` already uses `site: 'https://daryllbanal.com'` for canonical and social-share
URLs, but nothing points the domain at Vercel yet. In order:

1. **Register `daryllbanal.com`** (prep-week task in BRAND-GUIDE.md "Key dates").
2. **Merge this branch** (`dbinsights-hub`) into `main` and push, so Vercel builds the Hub.
3. In Vercel: **Project → Settings → Domains → Add** `daryllbanal.com` (and `www.daryllbanal.com`,
   set to redirect to the apex).
4. At the registrar, **add the DNS records Vercel shows** (usually an `A` record for the apex and a
   `CNAME` for `www`), or switch the domain's nameservers to Vercel's.
5. Wait for Vercel to show the domain as **Valid** (HTTPS is issued automatically), then open
   https://daryllbanal.com and check the social preview with LinkedIn's Post Inspector.
6. Optional: keep `db-insights.vercel.app` redirecting to `daryllbanal.com`.

## Deploying to Vercel

The repo is **static**, so Vercel needs no special configuration — it auto-detects Astro.

### Option A — connect a GitHub repo (recommended, gives you auto-deploys)

1. **Create a GitHub repo** and push this folder to it:
   ```sh
   # from inside portfolio/
   git remote add origin https://github.com/DaryllBanal1030/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. Go to **[vercel.com/new](https://vercel.com/new)** and sign in (GitHub login is easiest).
3. Click **Import** next to your new repo.
4. Vercel auto-detects the framework as **Astro**. Confirm these (they should be pre-filled):
   - **Framework Preset**: Astro
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **Deploy**. Done — you get a live URL in ~1 minute.
6. Every future `git push` to `main` redeploys automatically. Pushes to other branches get
   preview URLs.

> **Note on the project root:** if you push a repo where this app sits in a subfolder
> (e.g. `portfolio/`), set Vercel's **Root Directory** to `portfolio` in the import screen.
> If you push the contents of `portfolio/` as the repo root, leave it blank.

### Option B — Vercel CLI (no GitHub needed)

```sh
npm i -g vercel      # one-time
vercel               # from inside portfolio/ — follow the prompts to link/create a project
vercel --prod        # promote to production
```

---

Built with Astro & Tailwind.
