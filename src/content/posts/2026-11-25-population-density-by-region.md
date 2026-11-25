---
# Post 02: the first Data Story (DBAnalytics, Population theme), posted on
# LinkedIn Wed Nov 25, 2026. Text from
# dbinsights-brand/posts/post-02/caption-regions.md, as posted; only the
# formatting changed for the web (headings, "(slides 6 and 7)" dropped since
# the check is shown right here, hashtags left out).
# Every figure is PSA's (Table 3 of the release below); the ratios (20 times,
# 2 times the people, 2.5 times the land, 262 times) are worked out in the
# caption file. Images are web copies of
# dbinsights-brand/posts/post-02/render/chart-region-density.png and
# excel-check.png.
title: "Population density by region: Metro Manila doesn't fit on the chart"
date: 2026-11-25
format: "Data Story"
summary: "All 18 regions of the Philippines ranked by population density, from PSA's 2024 census, and how I checked every number in Excel and Python."
source: "PSA, Highlights on the Population Density in the Philippines based on the 2024 Census of Population (released Dec 17, 2025, ref. 2025-414), Table 3."
sourceLine: "PSA 2024 Census of Population"
linkedinUrl: "https://lnkd.in/p/gmDK3gkN"
cover: "/img/posts/2026-11-25-population-density-by-region.webp"
coverAlt: "Bar chart of population density by region in the Philippines, 2024, with Metro Manila's bar running off the chart"
draft: false
---

<!-- Web copies (WebP) of the post's renders, served from public/img/posts/.
     width/height stop the page jumping while they load. -->
<figure class="map-frame">
<img
  src="/img/posts/2026-11-25-population-density-by-region.webp"
  width="1600"
  height="1547"
  decoding="async"
  alt="Bar chart of population density by region, Philippines 2024, in people per km² of land, with a dashed line at the national average of 376. Above the average, in amber: Metro Manila (NCR) 22,561, its bar running off the chart; CALABARZON 1,102; Central Visayas 740; Central Luzon 574; Ilocos Region 416; Western Visayas 385. Below it, in grey: Negros Island Region 362; Bicol Region 337; BARMM 314; Zamboanga Peninsula 278; Northern Mindanao 278; Davao Region 248; SOCCSKSARGEN 220; Eastern Visayas 220; Caraga 131; Cagayan Valley 122; MIMAROPA 112; Cordillera (CAR) 86."
/>
<figcaption>
<span>Chart: PSA 2024 Census of Population</span>
<a href="/img/posts/2026-11-25-population-density-by-region.webp">Open the full-size chart</a>
</figcaption>
</figure>

Population density by region in the Philippines: Metro Manila doesn't fit on the chart.

At 22,561 people per km², its bar would be ==20 times longer== than CALABARZON's, the next most crowded region at 1,102. The national average is 376.

Only 6 of the 18 regions are above that average. The one I'd have gotten wrong: Central Visayas, at 740, is more crowded than Central Luzon, at 574. Central Luzon has about twice the people, but 2.5 times the land.

At the other end, the Cordillera has 86 people per km². Metro Manila is 262 times as crowded.

## How I checked it

I don't just copy PSA's numbers. I put their table into a spreadsheet and redid the math: people divided by land, for every region. All 18 matched. Then I added up the regions, and they came to 112,727,776, PSA's national total.

<figure class="map-frame">
<img
  src="/img/posts/2026-11-25-population-density-check.webp"
  width="1489"
  height="528"
  loading="lazy"
  decoding="async"
  alt="Excel table checking PSA's figures for the six regions above the national average. Columns: region, population, land area in km², PSA density, my check, same?, and vs national. Every row reads Yes and Above: Metro Manila 22,561; CALABARZON 1,102; Central Visayas 740; Central Luzon 574; Ilocos Region 416; Western Visayas 385. Philippines (PSA): 112,727,776 people on 300,000 km², density 376, my check 376, Yes. Sum of 18 regions: 112,727,776, Matches."
/>
<figcaption>
<span>My check in Excel (regions above the national average)</span>
</figcaption>
</figure>

I ran the same check in Python with pandas in about 16 lines. If you're learning Excel or Python, it's a good first exercise: copy a government table and check it.

## A quick note

On Monday I promised a city Top 10. PSA's density release only covers regions, so the city ranking comes once official city figures are out. I'd rather wait than use numbers I can't stand behind.

## Your turn

Which region surprised you the most?
