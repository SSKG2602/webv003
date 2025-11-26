{% raw %}
# Editing Guide

Use this guide to change text and content without touching backend logic.

## General tips
- Always work on `templates/index.html` for page content. It extends `templates/base.html`.
- Keep section IDs (`id="values"`, `id="why"`, etc.) because the navbar and smooth scroll rely on them.
- After editing, refresh the browser; no build step is needed.

## Hero (top of page)
- File: `templates/index.html`
- Location: `<section id="hero">`
- Edit the `<h1>` and the two `<p>` tags for the headline/subtext.
- Buttons: labels and target IDs live in the same block (look for `data-scroll-target`).

## Values (“What We Stand For”)
- File: `templates/index.html`
- Location: `<section id="values">`
- Content list: `values_pillars` Jinja list (array of dictionaries).
  - Change titles/summaries inside that list.
  - To add/remove a tile, add/remove an entry in `values_pillars`; the grid is responsive.

## Manifesto (“Our Manifesto / The Dasein Principles”)
- File: `templates/index.html`
- Location: `<section id="why">`
- Content list: `manifesto_pillars` Jinja list.
  - Each entry has a `title` and `lines` (bullets).
  - To add/remove a principle, adjust the list; numbering comes from the loop index.
  - Keep `manifesto-grid` container class for the two-column layout on desktop.

## Systems / Services / Projects
- File: `templates/index.html`
- Sections: `id="systems"`, `id="services"`, `id="projects"`
- Each section has an inline list (`systems`, `services`, `projects`) right above the cards.
  - Edit `title`, `status`, and `description` strings there.
  - Add/remove items by editing these lists; the grids auto-flow.

## About (founder/co-founder)
- File: `templates/index.html`
- Section: `id="about"`
- Text lives directly in the markup (names, subtitles, bios, modal content).
- Buttons/links: update `href` attributes for CTA and LinkedIn links in this section and in the modals at the bottom of the file.

## Contact section
- File: `templates/index.html`
- Section: `id="contact"`
- Email chips pull from env values (`FOUNDER_EMAIL`, `TECH_EMAIL`) passed in by `public.py`.
- Form labels/placeholders are plain text in this section.
- Submission behavior is in `static/js/main.js` (fetches `/api/contact` and `/api/subscribe`).

## Footer waitlist form
- File: `templates/index.html` inside `{% block footer %}`
- Text is inline; the form posts via JS to `/api/subscribe`.

## CSS tweaks
- File: `static/css/main.css`
- Color tokens and fonts are defined at the top under `:root`.
- Section/layout styles (grids, cards, buttons) live in the same file; edit or add classes here.
- Keep classes used by HTML (`manifesto-grid`, `values-grid`, `card`, `btn`, etc.) to preserve layout.

### Theme colors (non-engineer friendly)
- Default is Dark; Light is available via the navbar toggle.
- Theme palettes live in `static/css/main.css` under `.theme-dark` and `.theme-light`.
- Variables in each theme: `--background`, `--surface`, `--surface-soft`, `--border-subtle`, `--text-main`, `--text-muted`, `--accent`, `--accent-soft`, `--accent-on`.
- Edit the color values in both theme blocks to adjust palettes; keep the variable names the same.
- The toggle behavior and persistence are handled in `static/js/main.js` (no need to touch HTML when changing colors).

## JS behaviors
- File: `static/js/main.js`
- Handles scrolling, animations, modals, and form submissions.
- Update endpoint URLs here if the backend paths ever change (currently `/api/contact` and `/api/subscribe`).

## Adding a new page/section
- New section on the main page: add a `<section id="new-id">` block to `templates/index.html` and link to it via navbar or buttons using `data-scroll-target="new-id"`.
- New standalone page: create `templates/<page>.html` (extend `base.html`), add a route in `src/routes/public.py`, and add a navbar link if needed.

## Environment-driven text
- Contact display emails: set `FOUNDER_EMAIL` and `TECH_EMAIL` in `.env` (fall back to placeholders if not set).
- SMTP “to” email: set `CONTACT_TO_EMAIL` in `.env`.

## Safety checklist before saving
- Do not rename section IDs used by navbar links.
- Keep the JSON structures in JS fetch calls unchanged (API expects specific fields).
- After edits, skim the page to ensure grids still align (manifesto/values grids are responsive).
{% endraw %}
