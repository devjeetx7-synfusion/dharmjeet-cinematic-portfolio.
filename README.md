# Dharmjeet Singh — Cinematic Portfolio

A dark, cinematic developer portfolio for **Dharmjeet Singh** (SynFusion) — Android developer based in Bihar, India.

Static HTML, one design-system stylesheet and one dependency-free JavaScript module. No framework, no build step, no CDN requirement, no trackers.

> **Status:** static site, ready for GitHub Pages. Blogger conversion remains a later phase — this repository is **not** a Blogger XML theme (see `BLOGGER-CONVERSION.md`).

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Cinematic hero, About, featured projects, toolkit, journey, live GitHub repositories, contact |
| `work.html` | Filterable archive of all 8 projects |
| `project.html?slug=…` | Case study rendered from `js/projects.js` |
| `about.html` | Editorial about story + six-chapter 3D carousel |
| `js/projects.js` | Verified project, skill, journey and social content — edit content here |
| `js/site.js` | Rendering, navigation, reveals, GitHub API, carousel, copy-email |
| `css/style.css` | Complete design system (tokens, layout, components, motion, responsive) |
| `assets/` | Project cover artwork, favicon, Apple touch icon, self-hosted fonts |
| `BLOGGER-CONVERSION.md` | Notes for a future Blogger migration |

## Tech stack

- **HTML5** + semantic landmarks, one `<h1>` per page, skip link.
- **CSS** — custom properties, `clamp()` type scale, CSS grid, `prefers-reduced-motion`, `scroll-behavior: smooth`.
- **Vanilla JS (ES2017)** — IntersectionObserver reveals, requestAnimationFrame marquee, AbortController-based GitHub fetch with cache and fallback.
- **Fonts** — Manrope, DM Sans and Instrument Serif, self-hosted WOFF2 (SIL OFL 1.1, see `assets/fonts/OFL.txt`). No Google Fonts request at runtime.
- **GitHub REST API** — public, unauthenticated, 7s timeout, 15-minute `sessionStorage` cache, static fallback.
- **Hosting** — any static file server, or GitHub Pages (`.github/workflows/pages.yml`).

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

Any static server works (`npx serve`, VS Code Live Server, …). Use `http://`, not `file://`, so the GitHub API request and font loading behave normally.

## Testing

There is no build step, so "testing" means static checks plus browser checks:

```bash
# JavaScript syntax
node --check js/site.js && node --check js/projects.js

# Optional: DOM-level interaction tests with jsdom / real browser screenshots
# (test scripts are not committed; they were run locally during development)
```

Verified during the last pass:

- All four pages parse without HTML nesting errors, duplicate IDs or broken internal links.
- No console errors or failed requests (except a TLS-intercepted GitHub API call in the sandbox — the site degraded to the static repository list as designed).
- Navigation, mobile menu (focus move, Escape, focus return, scroll lock), filters, carousel (arrows, dots, keyboard, swipe, project picker), copy-email feedback and case-study routing all exercised in a real Chromium build.
- Layout checked at 320, 360, 390, 768, 1024, 1440 and 1920px: no horizontal overflow, no clipped body text.
- `prefers-reduced-motion: reduce` renders all content with animations disabled.
- Cumulative layout shift measured at 0 on a mobile viewport during a local run.

Lighthouse was **not** run — no verified score is claimed.

## Editing content

Everything editorial lives in `js/projects.js`:

- `projects[]` — `featured: true` shows a project on the homepage (the first featured project gets the large card).
- `status` / `statusTone` — `live`, `open`, `building` or `private`; the tone only changes the status dot colour.
- `links[]` — public destinations only (Google Play listing or public GitHub repository). Use `kind: "github"` for repository links.
- `skills[]`, `journey[]`, `socials[]` — toolkit cards, timeline, footer/menu social links.

**Never** add tokens, keystores, private repository URLs or client data to `js/projects.js` or any other front-end file.

## Assets

- `assets/*-cover.svg` are **original editorial cover graphics** (typographic compositions), not Android screenshots and not marketing claims about app UI. Cards, the hero and case studies label them as such.
- `assets/favicon.svg` and `assets/apple-touch-icon.png` are the DS mark in the site palette.
- A real portrait was never supplied. The hero intentionally uses a typographic composition rather than a stock photo. To add a genuine photo, place `assets/portrait.webp` and update the hero markup; do not use an unrelated person's photo. See `PHOTO-GUIDE.md`.
- When real app screenshots arrive, replace the matching `cover` value in `js/projects.js` and update the "not an app screenshot" wording in `js/site.js` / the hero caption.

## Accessibility & performance notes

- Semantic sections, `<main>`, `<nav aria-label>`, `<header>`/`<footer>` landmarks, skip link.
- Visible `:focus-visible` rings, keyboard-operable carousel and filters, `aria-pressed`/`aria-current` state, live regions for async results.
- Mobile menu moves focus into the panel, traps Tab, closes on Escape and returns focus.
- Tap targets ≥ 42px for controls; inline footer links are ≥ 28×36px.
- Reduced motion: entrance animations, marquee, parallax and transitions are disabled.
- Images are SVG (no raster payload), `loading="lazy"` below the fold, explicit `width`/`height` to prevent layout shift; the hero cover is `fetchpriority="high"`.
- One stylesheet, one script, self-hosted fonts with `font-display: swap` and two font preloads.
- Scroll handlers are passive and throttled through `requestAnimationFrame`; the marquee stops when off-screen or the tab is hidden.

## Deployment

1. Push this branch/repository to GitHub.
2. **Settings → Pages → Deploy from a branch → `main` / root**, or enable the included Actions workflow.
3. Replace the repository-specific URL in the docs if the final URL differs.

A custom domain is not configured, so no canonical URL is declared (adding one before the domain exists would be incorrect).

## Remaining manual steps

- Supply a genuine portrait photo and, if desired, real app screenshots.
- Confirm the X (`@getsynfusion`) profile is the intended public account — it comes from the GitHub profile metadata.
- Confirm the Telegram (`@synfusion_coder`) and Instagram (`@devjeetx7`) links are the public accounts to display.
- Optional: custom domain + `sitemap.xml`/`robots.txt` once the final URL is known.

## License

Site source code and original editorial graphics: MIT (`LICENSE`).
Bundled font files: SIL Open Font License 1.1 (`assets/fonts/OFL.txt`).
Project names and store listings belong to their respective owners.
