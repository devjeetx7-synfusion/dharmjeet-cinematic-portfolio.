# Image assets & photo slots

The design uses **typographic compositions and masked artwork**, never stock photos pretending to be Dharmjeet.
Missing photos therefore degrade gracefully: nothing looks broken and no fake portrait is displayed.

## Current artwork

| Path | Used for |
| --- | --- |
| `assets/*-cover.svg` | Original editorial cover graphics for the eight projects (hero stack, cards, case studies) |
| `assets/favicon.svg` | Browser favicon (DS monogram) |
| `assets/apple-touch-icon.png` | 180×180 iOS home-screen icon |
| `assets/fonts/*.woff2` | Self-hosted Manrope / DM Sans / Instrument Serif (SIL OFL 1.1) |

The cover graphics are **not** app screenshots. Cards, the hero caption and every case study say so explicitly.
Replace them only with genuine screenshots supplied by the owner, then update the wording in `js/site.js`
(`alt` text and the case-study note) and the hero caption in `index.html`.

## Adding a genuine portrait

A real portrait was never supplied, so the hero uses a deliberate typographic composition instead.
If you want a photo:

1. Save an approved image as `assets/portrait.webp` (ideally ~1600px tall, 150–350KB, sRGB, GPS metadata removed).
2. Replace the `hero__art` block in `index.html` with a `<figure>` containing that image plus `width`/`height` attributes.
3. Keep the text column separate — do not overlay the name on a face.
4. Do not rename a `.png` to `.webp` without converting it, and never use a stock image of someone else.

## Editing the six about chapters

- Chapters live in `about.html` as `article.chapter[data-chapter]` elements.
- `js/site.js` (`initChapters`) handles arrows, dots, keyboard (←/→/Home/End), swipe/drag and the project picker in chapter 03.
- `css/style.css` (section 14) owns the 3D carousel layout and responsive rules.
- Project data for the picker comes from `js/projects.js`; private repositories are never linked.

## Screenshot policy

Only add an image to this repository if it shows the actual product and you own the rights to publish it.
No placeholder should ever be described as a real screenshot.
