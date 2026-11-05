// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import remarkHighlight from './src/lib/remark-highlight.mjs';

// Astro config. The defaults give us a STATIC site (output: 'static'),
// which is exactly what we want for Vercel — plain HTML/CSS/JS, no server.
//
// `site` is your canonical production URL. Astro uses it to build absolute
// URLs for SEO/Open Graph tags and the sitemap. daryllbanal.com is the DB
// Insights Hub (see dbinsights-brand/docs/adr/0002-personal-domain-hub.md).
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
  site: 'https://daryllbanal.com',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkHighlight],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
