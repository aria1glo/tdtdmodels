# TDTD Models

Static site (HTML / CSS / vanilla JS) for TDTD Models, New York. Hosted on GitHub Pages.

## Pages
| File | What it is |
|---|---|
| `index.html` | Home: gold hero, featured talent, about teaser, Women/Men tiles, apply band |
| `women.html`, `men.html` | Roster grids (hover swaps to the second photo) |
| `model.html?id=…` | One profile page for every model, built from `js/roster.js` |
| `about.html` | Agency story, founder, contact |
| `submit.html` | Application form |
| `talent.html` | Old page, now just redirects to `women.html` |

## Adding or editing a model
1. Put photos in `images/models/<id>/` named `01.jpg`, `02.jpg`, … (first = card cover, second = hover image).
2. Copy a block in `js/roster.js`, then change `id`, `name`, `division` (`"women"` or `"men"`), `stats`, `instagram`.
3. Set `featured: true` to show them on the home page.

Keep photos around 1500px on the long edge (JPEG, quality ~80) so the site stays fast.

## Making the application form work
The form posts to Formspree. Create a free form at https://formspree.io, copy its ID, and in `submit.html` replace
`YOUR_FORM_ID` in the form's `action`. Until then, submitting opens the visitor's email app with the answers filled in.

## Changing the header / footer / contact info
`js/main.js` (top of the file) holds the email, Instagram link and menu items. They update on every page.

## Home page gold effect
`js/gold.js` is a small WebGL shader (no video file). Colours are the `deep`, `burg`, `gold`, `pale` lines inside it.
To use a real video instead: add a `<video autoplay muted loop playsinline>` inside `.hero` and remove the `<canvas>` and the `gold.js` script tag.

## Fonts and colours
Bodoni Moda + Jost load from Google Fonts (see each page's `<head>`). Colours live at the top of `style.css` (`--burgundy` etc.).
