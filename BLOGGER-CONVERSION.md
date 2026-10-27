# Blogger Conversion Roadmap

The site is intentionally **plain HTML/CSS/JavaScript** so a later Blogger XML template is possible without rewriting a React/Next.js application. **This repository is the working static version, not a Blogger installable theme yet.**

## Target architecture

- **Blogger as content backend:** About, Contact, journal posts, project case studies, published updates and labels are stored in Blogger Pages and Posts.
- **Blogger template:** Convert the common header/footer and visual shell to one XML XHTML-compliant `<html ...>` template, with `b:skin`, `b:section` and widgets for Blogger content.
- **Public code metadata:** GitHub API can keep supplying public repository data, but GitHub is never the site's editorial CMS. API failure fallback remains.
- **Assets:** Prefer Blogger-hosted images where possible; compile minified JS/CSS into the theme or use stable public assets. A GitHub repository is the version-control source, not a secret backend.
- **Project catalog:** Map Blogger Posts with label `Projects` and a project-category label to project card rendering (with post thumbnails and descriptions). Posts become case-study destinations; static `project.html?slug=...` URLs are replaced by canonical Blogger post URLs.
- **Journal:** Blogger Posts with label `Journal` supply articles and optional search/navigation.

## Concrete migration stages

1. **Content migration:** Create Blogger Pages for About and Contact and Posts for each publishable project, with categories like `Projects`, `Android`, `AI`, `Games`, `Web`. Do not publish private repository internals.
2. **Theme shell:** Rewrite `index.html`, header/footer and sections as XML-safe Blogger HTML. Include required `b:skin` and `b:section` tags; escape XML-sensitive characters.
3. **Templates:** Implement Blogger home, post, page and label views using `data:view`, `data:posts` and Blog widgets. Verify how links and post images resolve on Blogger.
4. **CSS and JS:** Copy `css/style.css` into `<b:skin>` (or host it separately) and adapt the vanilla `js/site.js` selectors. The site no longer depends on any CDN library, which makes this step simpler.
5. **Asset management:** Replace editorial cover art with **actual supplied screenshots** when available and convert assets to Blogger-hosted or other stable public URLs. Keep the self-hosted `assets/fonts/*.woff2` files or load the same families from a hosted CSS.
6. **Test:** Upload XML via Blogger → Theme → Edit HTML, test layout editor widgets, XML parsing, home/post/page/label routes, pagination, scripts, navigation and accessibility on mobile/desktop.
7. **Domain and SEO:** Connect optional custom domain, verify Blogger canonical URLs, sitemap, indexing and redirects from any previously shared GitHub Pages URLs.

## Important limitations

- Blogger does **not** run arbitrary Node servers or Next.js APIs. Any feature needing a private token/server must use a separate backend or be redesigned.
- Do not embed private GitHub PATs, Firebase secrets or signing keys into Blogger XML or client scripts.
- Google/Blogger can inject system styles and widgets and impose markup constraints; animations should not depend on fragile DOM selectors.
- XML template syntax is **not** equivalent to ordinary static HTML. Do not paste `index.html` directly into the Blogger theme editor.
- A GitHub Pages site is optional for preview and version control; the final user-facing site can run on Blogger.

## Related official resources

- Blogger theme editing: https://support.google.com/blogger/answer/176245
- Blogger section and widget tags: https://support.google.com/blogger/answer/46888