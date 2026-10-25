# Personal photos — V3 cinematic portfolio

The site intentionally does **not** invent personal photographs or re-use the old bike/lake image as the hero. All images below are OPTIONAL. If missing, the site displays its designed typography/artwork fallback rather than a broken image.

Upload JPG files in the `assets/` directory using these exact lowercase filenames:

| File | Placement | Suggested crop |
| --- | --- | --- |
| `hero-portrait.jpg` | Homepage cinematic portrait and About Chapter 01 | Vertical 4:5, clear face, good light, with room around the head |
| `about-me.jpg` | About page introductory art panel | Vertical 4:5, different portrait/look |
| `my-journey.jpg` | About Chapter 02 journey block | Vertical 4:5 or 3:4, genuine workspace/coding or personal candid |
| `lifestyle.jpg` | About Chapter 04 full-width background | Landscape 16:9, outdoor/lifestyle scene |

The old `assets/profile.jpg` is no longer used by the homepage. Do **not** change image file extensions without changing HTML paths.

Suggested export: sRGB JPEG at about 1600 px long edge, 80–85% quality, and strip GPS metadata. Real app screenshots should be used only after obtaining them from the app.

**Where the photos are used**
- `index.html`: `hero-portrait.jpg`
- `about.html`: `about-me.jpg`, `hero-portrait.jpg`, `my-journey.jpg`, `lifestyle.jpg`
- `assets/*-cover.svg`: original project *concept artwork*, not app screenshots

Photo uploads are separate from this code update. No image files were invented.
