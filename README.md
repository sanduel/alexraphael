# alexraphael.com

Walking tours of New York's layered history, by Alex Raphael.

Static site built with Astro, Tailwind v4, and content collections for tour markdown. Deploys to Cloudflare Pages on every push to `main`.

## Local development

```sh
npm install
npm run dev    # http://localhost:4321
npm run build  # production build to ./dist/
npm test       # vitest
```

## Adding an upcoming tour

Create a new file in `src/content/tours/<slug>.md`:

```markdown
---
title: "Your tour title"
date: 2026-06-14T14:00:00-04:00
duration: "2 hours"
meetingPoint: "Washington Square Arch"
bookingUrl: "https://www.eventbrite.com/e/..."
status: "upcoming"
---

A paragraph describing the tour.
```

`status` is one of `upcoming`, `sold-out`, or `past`. Only `upcoming` tours appear on the site, sorted by date ascending. Push to `main` and Cloudflare auto-deploys.

You can edit and create these files directly in the GitHub web UI — no local dev needed.

## Swapping in the Loops form

The signup section (`src/components/SignupForm.astro`) currently shows a placeholder. To wire up Loops:

1. In Loops → Forms → your form → **Embed**, copy the snippet.
2. Replace the placeholder `<div>` in `SignupForm.astro` with the snippet.
3. Commit and push.

## Changing the accent color

The brick-red accent is defined in `src/styles/global.css` under `@theme`:

```css
--color-accent: #b04a3a;
```

Change the hex, save, and the site rebuilds.

## Deploy

Cloudflare Pages is connected to this repo. Every push to `main` triggers a build (`npm run build` → `dist/`). The site is served at `alexraphael.com`.

## Tests

`npm test` runs the Vitest suite. Currently covers `selectUpcomingTours()` — the function that filters and sorts tour entries for the Upcoming Tours section.
