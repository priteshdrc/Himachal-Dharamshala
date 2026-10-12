# Diwali Trip · Punjab & Himachal Pradesh

A mobile-friendly, day-by-day guide for the family trip on 8–17 November 2026:
Amritsar → Dalhousie → Dharamshala / McLeod Ganj → Kangra → Bir → Kullu → Lahaul → Mandi → Chandigarh.

- English / ગુજરાતી switch (remembered on the phone)
- Day 1–10 timeline with wake-up times, drives, tips, hotel and train details, and map links
- "At a glance" list of every night's stay, showing which hotels are confirmed and which are still to book
- Shows the countdown before the trip and jumps to today's plan during it
- No caching: every visit loads the latest version, so pushed changes show up on the next refresh

## Editing the trip

All content is in [`data.js`](data.js); vegetarian restaurant picks are in [`food.js`](food.js). Change a time, hotel or booking status there and push; the site updates.
When a pending hotel gets booked, change its `status` to `"confirmed"` and add `name`, `map`, `via`, `checkin` and `checkout`.

Booking numbers (PNRs and booking IDs) are partly hidden because the published site is public.

## Publishing on GitHub Pages

Settings → Pages → Build and deployment → Source: **Deploy from a branch** → pick this branch and `/ (root)` → Save.
The site will be at `https://priteshdrc.github.io/Himachal-Dharamshala/`.

To preview locally: `python3 -m http.server` and open http://localhost:8000.
