# Daryll Banal — portfolio hub

A fast, static **portfolio hub** built with **Astro + Tailwind CSS**. It introduces me,
advertises each of my projects, and links out to them — each project lives on its own
independent site. The site is a single page with anchored nav sections:
**Work · About · Experience · Credentials · Contact**.

Replaces the previous Next.js site at `db-insights.vercel.app`.

---

## Tech stack

- **[Astro](https://astro.build)** (static output) — ships HTML/CSS with almost no JavaScript.
- **[Tailwind CSS v4](https://tailwindcss.com)** — utility CSS, configured entirely in
  `src/styles/global.css` (no `tailwind.config.js` in v4).
- **Fonts**: Inter (sans) + JetBrains Mono (mono), self-hosted via
  [`@fontsource`](https://fontsource.org).
- **Deploy target**: Vercel (static).

## A few Astro concepts (for the frontend-curious)

- **Zero JS by default.** `.astro` components render to plain HTML at build time. The frontmatter
  block (between the `---` fences) runs on the server only.
- **Islands.** The few interactive bits — the **theme toggle** and the **featured-work carousel** —
  are "islands": isolated components that get a `client:*` directive so *only they* ship JS. The
  rest of the page stays static.
- **Layouts.** `src/layouts/BaseLayout.astro` is the shared shell (`<head>`, SEO/OG tags, fonts,
  nav, footer). Pages render their content into its `<slot />`.
- **Content collections.** Projects and credentials live as Markdown files in `src/content/`,
  validated by zod schemas in `src/content.config.ts`. **Adding a project or a credential = adding
  one `.md` file. No layout changes.**

## Project structure

```text
portfolio/
├── public/                 # static assets served at the site root
│   ├── favicon.svg         # DB monogram
│   ├── resume.pdf          # ← PLACEHOLDER: drop your résumé here
│   ├── daryll.jpg          # ← PLACEHOLDER: drop your photo here
│   └── og.png              # social-share preview image
├── src/
│   ├── content.config.ts   # zod schemas for the collections
│   ├── content/
│   │   ├── projects/       # one .md per project
│   │   └── credentials/    # one .md per credential
│   ├── layouts/BaseLayout.astro
│   ├── components/         # Nav, Hero, Carousel, sections, etc.
│   ├── styles/global.css   # design system: Tailwind + both theme palettes
│   └── pages/index.astro   # the single page, composing all sections
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

- `public/resume.pdf` — your résumé (linked from the nav).
- `public/daryll.jpg` — your photo (used in the About section).
- `DBLEARNING_URL` — the DBLearning YouTube channel link (in `src/components/DBLearningBand.astro`).
- Each project's `liveUrl` / `repoUrl` (in `src/content/projects/*.md`).
- Each credential's `title` / `issuer` / `year` / `verifyUrl` (in `src/content/credentials/*.md`).

---

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
