# V4 personal image assets (Cinematic Fusion)

The design uses **full-image masked blends**, not circular crops or hard rectangular photo cards. Files are intentionally optional: missing photos fall back to illustrated typography and colors without pretending a stock photo is Dharmjeet.

Upload under `assets/` with these exact filenames:

| Filename | Where used | Ideal photo |
| --- | --- | --- |
| `hero-portrait.jpg` | Homepage, text overlays original portrait | Clear 3:4 or 4:5 face-and-upper-body image, plenty of space around subject |
| `about-me.jpg` | Chapter 01: The Person | Another genuine portrait, waist-up or full-body |
| `my-journey.jpg` | Chapter 02: The Journey | Coding/workspace candid, vertical composition |
| `lifestyle.jpg` | Chapter 04: Beyond the Screen | Real landscape outdoor photo, 16:9 suitable |

**Avoid:** images with tiny subjects against very bright skies for the homepage; text overlays cannot fix an inherently small subject. The bike/lake photo works better in Chapter 04.

Use ordinary JPEG sRGB, ideally ~1600 px on the longest side and optimized to roughly 200–500KB. Remove GPS metadata before uploading. Do not rename `.png` as `.jpg` without actual conversion.

## How to edit carousel content

- `about.html` has six `data-v4-panel` slides, arranged into a rotating 3D carousel (not a vertical list).
- `js/v4.js` manages arrow/swipe/keyboard navigation, side-slide clicks and the active project showcase.
- `css/v4.css` owns all V4 responsive layout and animation effects.
- Project data remains in `js/projects.js`; private repository content is not published.
- This static website remains prepared for later Blogger XML conversion; it is **not** a Blogger theme yet.

## V5 note

For the hero, a clear portrait with a large subject looks better than a distant figure in a landscape shot. The current CSS blends the image edges but cannot invent a closer camera composition. Use `hero-portrait.jpg` for a separate, recognizable photo; reserve the lake/bike photograph for `lifestyle.jpg`.

Social icons now appear in the navigation and footer. The Instagram account is active. For Facebook, YouTube and X, replace the placeholder `span.v5-social--pending` with an `a` element only after adding a confirmed personal profile link.
