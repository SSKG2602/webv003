{% raw %}
# Style Guide

Keep future changes consistent with the current codebase.

## Naming conventions
- Python: `snake_case` for files and functions (`config.py`, `get_db`), PascalCase for classes if added.
- Templates: lowercase with dashes/underscores (`index.html`, `base.html`).
- Sections/anchors: short, lowercase IDs (`hero`, `values`, `why`, `systems`, `services`, `projects`, `about`, `contact`) so navbar scroll works.
- CSS classes: descriptive and short (`manifesto-grid`, `card`, `btn`, `values-grid`, `navbar`).

## HTML/Jinja
- Extend `templates/base.html` for any new pages; put shared head/nav/footer there.
- Use `{% block content %}` and `{% block footer %}` to separate main body and footer.
- Keep inline data lists (e.g., `manifesto_pillars`, `values_pillars`) near the sections they render for readability.
- Preserve semantic tags (`section`, `h1`/`h2`/`h3`, `p`, `ul/li`) for accessibility.

## CSS
- Centralize colors and typography tokens at the top of `static/css/main.css` under `:root`.
- Reuse existing utility-like classes (`card`, `btn`, `badge`, `grid`, `stack`) instead of creating near-duplicates.
- Responsive rules: use media queries already in `main.css` (`@media (min-width: 768px)` etc.) when adding grids or layout changes.
- Keep new rules scoped to relevant classes to avoid bleed-over into other sections.

### Theme system
- Theme variables live in `static/css/main.css` under `.theme-dark` and `.theme-light`.
- Core variables: `--background`, `--surface`, `--surface-soft`, `--border-subtle`, `--text-main`, `--text-muted`, `--accent`, `--accent-soft`, `--accent-on`.
- Apply colors using these variables; avoid new hard-coded colors.
- The `<body>` carries `theme-dark` (default) or `theme-light`; switching the class flips palettes.
- Navbar toggle styling is in `main.css` (`.theme-toggle`), and toggle logic is in `static/js/main.js`.

## JavaScript
- Keep behaviors in `static/js/main.js`; avoid inline scripts in templates unless necessary.
- Use data attributes (`data-scroll-target`, `data-animate`, `data-pulse-surface`, `data-profile-card`) to hook interactions.
- If adding new API calls, mirror the existing fetch pattern (JSON body, error handling via toasts).

## File organization
- Routes: add new page routes to `src/routes/public.py`; add API endpoints to `src/routes/api.py`.
- Database: add new collection helpers to `src/db/models.py`; keep logic thin (no business rules here).
- Services: place external integrations (email, etc.) in `src/services/`.
- Static assets: put new styles in `static/css/main.css`, new scripts in `static/js/main.js`, images in `static/img/`.

## Copy/content edits
- Edit text directly in `templates/index.html` for most content; avoid duplicating copy across files.
- Keep button/anchor labels matched to their `data-scroll-target`/`href` destinations.
- When adding cards/tiles, maintain the existing grid container classes (`manifesto-grid`, `values-grid`, `card-grid`) for consistent spacing.

## Accessibility & UX
- Maintain heading hierarchy (one `<h1>` in hero, `<h2>` for section titles, `<h3>` for card titles).
- Keep link/button text descriptive; avoid empty `href`/`button` elements.
- Preserve focusable elements for modals and form controls; if adding modals, reuse the `.modal` structure in `templates/index.html`.
{% endraw %}
