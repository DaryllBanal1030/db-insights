// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Astro config. The defaults give us a STATIC site (output: 'static'),
// which is exactly what we want for Vercel — plain HTML/CSS/JS, no server.
//
// `site` is your canonical production URL. Astro uses it to build absolute
// URLs for SEO/Open Graph tags and the sitemap. Update this once you know
// your final Vercel domain.
//
// Tailwind v4 plugs in as a *Vite plugin* (this is the modern way — there is
// no `tailwind.config.js` anymore; theme tokens live in CSS instead — see
// src/styles/global.css).
export default defineConfig({
  site: 'https://db-insights.vercel.app',
  vite: {
    plugins: [tailwindcss()],
  },
});
