{% raw %}
# Architecture

## High-level flow
- `app.py` starts Flask, loads environment config from `config.py`, registers blueprints, and pings MongoDB to ensure connectivity.
- Public requests (`/`) are served by `src/routes/public.py`, rendering Jinja templates from `templates/`.
- Static assets (CSS/JS/images) are served from `static/`.
- API requests (`/api/*`) are handled by `src/routes/api.py`, which validates input, reads/writes MongoDB via `src/db`, and returns JSON. Contact requests can trigger SMTP email via `src/services/mail.py`.

## Request lifecycle
1. Browser loads `/` → `public.py` calls `render_template("index.html", ...)`.
2. `templates/index.html` extends `templates/base.html`, which injects the navbar, head tags, and loads `static/css/main.css` and `static/js/main.js`.
3. User navigates via anchor links handled by `main.js` (`data-scroll-target` attributes) and sees animations/canvas effects from `main.js`.
4. Forms:
   - Contact form → POST `/api/contact` → validation in `api.py` → `src/db/models.py.insert_contact` → optional email via `src/services/mail.py` → JSON response.
   - Subscribe form → POST `/api/subscribe` → validation in `api.py` → `src/db/models.py.insert_subscriber` (deduped by email) → JSON response.
   - Health check → GET `/api/health` → JSON `{"status": "ok"}`.
5. Responses: HTML via Jinja for pages; JSON for APIs. CSS/JS control look-and-feel and behaviors.

## Template inheritance
- `templates/base.html`: Shared shell (head, fonts, navbar, footer block, scripts).
- `templates/index.html`: Main single-page layout; fills `{% block content %}` and `{% block footer %}` with all sections.
- `templates/error.html`: Extends `base.html` for generic error display.
- Theme: `<body>` carries `theme-dark` or `theme-light`; toggle is in the navbar (`base.html`), styles in `static/css/main.css`, logic/persistence in `static/js/main.js`.
- Style system docs: `docs/STYLE_SYSTEM.md` for variables/cards/spacing; `docs/THEME_GUIDE.md` for theme controls.

## Section-to-template map
- Hero, Values, Manifesto, Systems, Services, Projects, About, Contact, Footer: all live in `templates/index.html` as separate `<section>` blocks.
- Navbar and global head: `templates/base.html`.
- Form behaviors, scrolling, animations: `static/js/main.js`.
- Styling tokens and layout rules: `static/css/main.css`.

## Data + storage
- MongoDB via PyMongo:
  - `contacts` collection: contact form submissions (`insert_contact` in `src/db/models.py`).
  - `subscribers` collection: waitlist/email signups with unique email index (`insert_subscriber` in `src/db/models.py`).
- Connection helper: `src/db/client.py` (`get_client()`, `get_db()`).

## Configuration
- `.env` (copy from `.env.example`) provides `MONGO_URI` (required), `DB_NAME`, SMTP settings, and display emails.
- `config.py` reads env vars and makes them available to routes and services.
{% endraw %}
