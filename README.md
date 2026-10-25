# Dharmjeet Singh — Cinematic Portfolio

A cinematic, responsive, **Blogger-conversion-friendly** developer portfolio for Dharmjeet Singh / SynFusion.

**Concept:** editorial typography, smooth scroll-triggered motion, original project-cover illustrations, real GitHub links, verified projects, and accessible native navigation. The visual direction is inspired by modern smooth-scroll portfolios, but this code, composition, typography, colors and artwork are original.

> **Status:** Complete static website (v1). **Not yet a Blogger XML theme**. The Blogger adapter and Blogger Post/Page data integration belong to the next migration phase.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Cinematic hero, story, featured projects, public GitHub repositories, expertise, contact |
| `work.html` | All projects with category filters |
| `project.html?slug=...` | Individual dynamically rendered project case studies |
| `about.html` | Personal story and areas of expertise |
| `js/projects.js` | Verified portfolio content — edit projects here |
| `js/site.js` | Rendering, accessible menu, GitHub API, scroll reveal, GSAP animations |
| `css/style.css` | Responsive stylesheet and visual design tokens |
| `assets/*-cover.svg` | Original abstract editorial graphics (NOT app screenshots) |
| `BLOGGER-CONVERSION.md` | Practical Blogger migration roadmap |

## Tech stack

- HTML5, vanilla CSS and JavaScript, with **no framework or build step**.
- GSAP 3.15.0 and ScrollTrigger via CDN (animations are optional; site works without them).
- GitHub public REST API (client-side, no private token, 6-second request timeout and static fallback).
- Google Fonts with system fallbacks.
- Hosting: any static server / GitHub Pages.

## Local preview

From the project folder:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/` in your browser. Avoid `file://` for normal testing because external API requests and some browser policies may behave differently.

## Publishing with GitHub Pages

1. Create a **public** GitHub repository named `dharmjeet-cinematic-portfolio` (or another name).
2. Upload or push all files **including the `assets/`, `css/` and `js/` folders**.
3. In **Settings → Pages**, select **Deploy from a branch**, `main`, `/ (root)`, and save; or use the included GitHub Actions Pages workflow after enabling Actions-based Pages deployment.
4. GitHub will provide a URL similar to `https://USERNAME.github.io/REPOSITORY/` once the site is deployed. **Do not assume it exists before publishing.**

### Push through Git (after creating the empty GitHub repo)

```bash
git init
git add .
git commit -m "feat: launch cinematic developer portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/dharmjeet-cinematic-portfolio.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub login. The verified account during preparation was `devjeetx7-synfusion`.

## Editing projects

Edit `js/projects.js`:

- `featured: true` displays the project on the homepage.
- `category` controls the project filter.
- `links` contains only public destinations, such as Google Play and public GitHub URLs.
- **Never put private tokens, private GitHub source URLs, keystores, passwords or personal data into this file.**
- New project cover art can replace `assets/<slug>-cover.svg` or use a genuine screenshot supplied by the owner.

The 8 case-study entries are based on verified README/project details and product listing information, not imaginary statistics.

## Project media and identity

- The eight built-in project covers are **original editorial illustrations**, not Android screenshots or claims about the running application UI.
- The original portrait photo was not available as a file during this build. The hero uses a motion-ready **DS monogram** instead of inventing a face. To add a photo, save the approved image to `assets/portrait.webp` and modify the hero/About markup and CSS; do not use an unrelated person's photo.
- Private WorkDaily and CinePrompt repository sources are intentionally not displayed. WorkDaily's official public Google Play listing is linked instead.
- GitHub repo counts and stars only come from live GitHub public API; if the API fails the site displays selected public links without fabricated stats.

## Performance, privacy and accessibility

- Native browser scrolling (no forced scroll hijacking).
- Intersections and GPU-friendly transforms for most reveals.
- `prefers-reduced-motion` disables unnecessary animations.
- Keyboard navigation, skip-to-content and Escape-to-close menu.
- Respect public GitHub API rate limits. Public API requests can fail or be throttled; fallback is available.
- No cookies, analytics, trackers or form-submission backends in v1.
- Contact uses a `mailto:` action; it does not pretend to transmit form data.

## Further improvements

- Supply verified app screenshots and your approved headshot.
- Add Play Store links for other confirmed published apps.
- Convert routing, content and XML markup into Blogger (`BLOGGER-CONVERSION.md`).
- Optional resume PDF, journal posts, Open Graph image and custom domain after content review.

## Attribution / licensing

Site source code and original editorial graphics: MIT (`LICENSE`). Font families available via Google Fonts are subject to their respective licenses. GSAP, hosted separately on a CDN, uses its own license and is not redistributed in this repository. All project names belong to their respective owners. No Dennis Snellenberg code, images or brand assets have been copied.