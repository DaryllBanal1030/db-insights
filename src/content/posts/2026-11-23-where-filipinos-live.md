---
# Post 01: the first Map Breakdown (DBSpatial, Population theme).
# Text from dbinsights-brand/posts/post-01/caption-worldpop.md (the SEO
# rewrite); method from dbinsights-brand/guides/WORLDPOP-POST-01.md.
# Figures are PSA's official ones: "Highlights on the Population Density in
# the Philippines based on the 2024 Census of Population (2024 POPCEN)",
# released Dec 17, 2025, ref. 2025-414 (LMB 2019 land areas; 112,727,776
# people on an estimated 300,000 km²). No city-level densities: those used
# 2013 land areas and aren't confirmed yet. The map is WorldPop 2020; no
# number in the text is read off the map.
title: "Where Filipinos live, one square kilometre at a time"
date: 2026-11-23
format: "Map Breakdown"
summary: "A 3D map of where everyone in the Philippines lives, one 1 km square at a time."
source: "Map: WorldPop 2020, 1 km grid (UN-adjusted); heights capped at 60,000 people/km². Map data: WorldPop (www.worldpop.org), CC BY 4.0, DOI 10.5258/SOTON/WP00675. Figures: PSA, Highlights on the Population Density in the Philippines based on the 2024 Census of Population (released Dec 17, 2025, ref. 2025-414)."
sourceLine: "PSA 2024 Census of Population · WorldPop 2020"
# The LinkedIn post (went out Mon Nov 23, 2026).
linkedinUrl: "https://lnkd.in/p/gJwGKPD7"
cover: "/img/posts/2026-11-23-where-filipinos-live.webp"
coverAlt: "3D population density map of the Philippines, with the tallest red spikes in Metro Manila"
draft: false
---

<!-- The image is a web copy (WebP, 1600 × 2000) of
     dbinsights-brand/posts/post-01/render/DBInsights-post01.png, served as-is
     from public/img/posts/. width/height stop the page jumping while it loads.
     The link under it opens the image on its own, where phones can zoom in. -->
<figure class="map-frame">
<img
  src="/img/posts/2026-11-23-where-filipinos-live.webp"
  width="1600"
  height="2000"
  decoding="async"
  alt="3D map of the Philippines' population density on a 1 km grid (WorldPop 2020). Each square kilometre is a column whose height and colour show people per km², from cream (1 to 10) through gold and orange to deep red (over 5,000). The tallest red spikes crowd Metro Manila; smaller spikes stand at Cebu City, Davao City, Iloilo City, Bacolod City, Zamboanga City and Puerto Princesa City. Text on the map: 12.4% of Filipinos live in Metro Manila, on just 0.2% of the land. That's 22,561 people per km², 60 times the national average of 376 (PSA, 2024)."
/>
<figcaption>
<span>Map: WorldPop 2020, 1 km grid</span>
<a href="/img/posts/2026-11-23-where-filipinos-live.webp">Open the full-size map</a>
</figcaption>
</figure>

Population density map of the Philippines: 12.4% of Filipinos live in Metro Manila, on just ==0.2% of the land==.

Each column on this map is one square kilometre. The taller and redder it is, the more people live there. Look at Luzon and you can see the country's population piling into one corner.

## What the census says

From PSA's 2024 Census of Population:

- Metro Manila has 22,561 people per km², more than 60 times the national average of 376.
- CALABARZON is next at 1,102. The Cordillera is the least crowded region at 86.
- Metro Manila, CALABARZON and Central Luzon together hold 39% of Filipinos on 13% of the land.

## How I made it

I took WorldPop's 1 km population grid, prepared it in QGIS, built the 3D columns in Blender, and added the labels in PowerPoint.

These are the main steps, not a full tutorial. If you'd like a complete step-by-step guide, tell me in the comments on LinkedIn. If enough people ask, I'll write one.

## Your turn

Now find your hometown. Is it a red spike or flat cream?

On Wednesday: the 10 most crowded cities outside Metro Manila.
