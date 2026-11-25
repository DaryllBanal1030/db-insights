// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import remarkHighlight from './src/lib/remark-highlight.mjs';

// Astro config. The site is STATIC (output: 'static', the default): every
// page is plain HTML built ahead of time. The ONE exception is the view
// counter, src/pages/api/views/[slug].ts, which opts out with
// `export const prerender = false` and runs as a small Vercel function. The
// `vercel()` adapter is what turns that file into a function; every other
// page stays static.
//
// `site` is your canonical production URL. Astro uses it to build absolute
// URLs for SEO/Open Graph tags and the sitemap. The Hub's address is
// https://db-insights.vercel.app/ until daryllbanal.com is secured
// (BRAND-GUIDE.md "Presence & naming"); change it here when that happens.
//
// Tailwind v4 plugs in as a *Vite plugin* (this is the modern way — there is
// no `tailwind.config.js` anymore; theme tokens live in CSS instead — see
// src/styles/global.css).
//
// The sitemap integration writes dist/sitemap-index.xml at build time: a list
// of every page, so Google can find and index the whole Hub. It needs `site`
// to build full URLs. The 404 page is left out automatically.
//
// `markdown.remarkPlugins` adds our ==highlight== syntax to every Markdown
// post (see src/lib/remark-highlight.mjs).
export default defineConfig({
  site: 'https://db-insights.vercel.app',
  adapter: vercel(),
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkHighlight],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
