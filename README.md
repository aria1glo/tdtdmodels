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

## Application form
`submit.html` posts to Formspree (form ID `xrppvgpb`). It collects personal details, measurements (imperial or metric), four digitals and social handles.
- Photos are resized in the browser (max 1600px) before upload. File attachments need a Formspree plan that supports uploads.
  If yours doesn't, set `FORM_UPLOADS = false` at the top of the form section in `js/main.js` and the photo slots become one "link to your digitals" field.
- Applicants under 18 are asked for a parent/guardian automatically (from the date of birth).

## Changing the header / footer / contact info
`js/main.js` (top of the file) holds the email, Instagram link and menu items. They update on every page.

## Home page gold effect
`js/gold.js` is a small WebGL shader (no video file). Colours are the `deep`, `burg`, `gold`, `pale` lines inside it.
To use a real video instead: add a `<video autoplay muted loop playsinline>` inside `.hero` and remove the `<canvas>` and the `gold.js` script tag.

## Fonts and colours
Bodoni Moda + Jost load from Google Fonts (see each page's `<head>`). Colours live at the top of `style.css` (`--burgundy` etc.).
