---
# Post 01: the first Map Breakdown (DBSpatial, Population theme).
# Text from dbinsights-brand/posts/post-01/caption-worldpop.md; method from
# dbinsights-brand/guides/WORLDPOP-POST-01.md. Figures are PSA 2024; the map
# is WorldPop 2020. The caption file asks to confirm the national figure
# (375.8 per km², 112,727,776 people) against PSA's official 2024 release.
title: "Where Filipinos live, one square kilometre at a time"
date: 2026-11-23
format: "Map Breakdown"
summary: "A 3D map of where everyone in the Philippines lives, one 1 km square at a time."
source: "Map: WorldPop 2020, 1 km grid (UN-adjusted); heights capped at 60,000 people/km². Figures: PSA 2024 Census of Population. Map data: WorldPop (www.worldpop.org), CC BY 4.0, DOI 10.5258/SOTON/WP00675."
# Fill this in after posting on LinkedIn (Mon Nov 23, 2026), then uncomment:
# linkedinUrl: "https://www.linkedin.com/posts/..."
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
  alt="3D map of the Philippines' population density on a 1 km grid (WorldPop 2020). Each square kilometre is a column whose height and colour show people per km², from cream (1 to 10) through gold to deep red (over 5,000). The tallest red spikes crowd Metro Manila; smaller spikes stand at Cebu City, Davao City, Iloilo City, Bacolod City, Zamboanga City and Puerto Princesa City. Text on the map: 12.4% of Filipinos live in the National Capital Region, on just 0.2% of the land."
/>
<figcaption>
<span>Map: WorldPop 2020, 1 km grid</span>
<a href="/img/posts/2026-11-23-where-filipinos-live.webp">Open the full-size map</a>
</figcaption>
</figure>

12.4% of Filipinos live on ==0.2% of the country's land==.

That's Metro Manila: 14 million people on about 620 km². I mapped where everyone lives, one square kilometre at a time. Each spike is a 1 km square; the taller and redder, the more people in it.

## What stood out

- Metro Manila averages 22,600 people per km², 60 times the national average of 375.8.
- The City of Manila alone reaches 76,164 per km², the densest in the country. Mandaluyong (50,151) and Pasay (32,440) follow.
- Metro Manila, CALABARZON and Central Luzon together hold 39% of Filipinos on 13% of the land.
- Davao City has almost as many people as the City of Manila (1.85M vs 1.90M), spread over about 98 times the land. That's why its spike looks modest.
- Only about 1 in 3 cities and municipalities (567 of 1,624) are denser than the national average. A few very crowded places pull the average up.

## Two questions for you

1. Find your hometown on the map: tall red spike or flat cream?
2. If one big employer or government office moved out of Metro Manila, where should it go, and why?

## How I made it

- **Data:** WorldPop's 2020 population density grid for the Philippines, 1 km squares, adjusted to the UN national total. The PSA 2024 figures above come from the census, not from the map.
- **Heights:** linear, so the countryside stays low and the cities spike, and capped at 60,000 people per km², so a few single cells that are model artefacts don't turn into giant fake needles.
- **Colour:** five density classes, cream through gold to deep red, the same classes as the legend.
- **Tools:** QGIS to reproject the grid and turn density into heights, Blender to build and light the 3D columns, and PowerPoint for the title, legend and city labels.
