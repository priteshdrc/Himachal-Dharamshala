# Diwali Trip · Punjab & Himachal Pradesh

A mobile-friendly, day-by-day guide for the family trip on 8–17 November 2026:
Amritsar → Dalhousie → Dharamshala / McLeod Ganj → Kangra → Bir → Kullu → Lahaul → Mandi → Chandigarh.

- English / ગુજરાતી switch (remembered on the phone)
- Day 1–10 timeline with wake-up times, drives, tips, hotel and train details, and map links
- "At a glance" list of every night's stay, showing which hotels are confirmed and which are still to book
- Shows the countdown before the trip and jumps to today's plan during it
- Weather on each day: current temperature at the place, plus the forecast for the visit date (or the usual temperature for that date until the forecast is available), from [Open-Meteo](https://open-meteo.com)
- Journey map (Jalandhar → Chandigarh) with numbered, dated pins and a stop list; stops are in [`route.js`](route.js)
- Videos on each day (collapsed by default) that play in a popup on the page; links are in [`videos.js`](videos.js)
- No caching: every visit loads the latest version, so pushed changes show up on the next refresh

## Alternative plan

[`alt.html`](alt.html) shows an alternative itinerary (skip Chamera Lake and Kangra Fort, Baglamukhi on the way to Dharamshala, Bir and Kullu on Day 6, two nights in Lahaul with a full day at Jispa). It reuses the main plan's data and rewrites Days 4, 6, 7 and 8 in [`alt-plan.js`](alt-plan.js). Each page links to the other from the header.

## PDFs

Both pages have a **Download PDF** button that serves a pre-built PDF for the plan and language on screen: `pdf/main-gu.pdf`, `pdf/main-en.pdf`, `pdf/alt-gu.pdf`, `pdf/alt-en.pdf`. They leave out meals, videos, maps, weather and photos. After changing the plan, rebuild them with [`tools/make-pdf.js`](tools/make-pdf.js) (instructions at the top of the file) so they match the site.

## Editing the trip

All content is in [`data.js`](data.js); vegetarian restaurant picks are in [`food.js`](food.js). Change a time, hotel or booking status there and push; the site updates.
When a pending hotel gets booked, change its `status` to `"confirmed"` and add `name`, `map`, `via`, `checkin` and `checkout`.

Booking numbers (PNRs and booking IDs) are partly hidden because the published site is public.

## Publishing on GitHub Pages

Settings → Pages → Build and deployment → Source: **Deploy from a branch** → pick this branch and `/ (root)` → Save.
The site will be at `https://priteshdrc.github.io/Himachal-Dharamshala/`.

To preview locally: `python3 -m http.server` and open http://localhost:8000.
