# FigmatobedoneWebsite

Rebuild of the Dasein marketing site on Flask with Jinja2 templates, plain HTML/CSS, vanilla JS, and MongoDB via PyMongo. The layout, wording, and flows match the original React/Express site.

## Tech Stack
- Backend: Flask (Python) + Blueprints (`src/routes`)
- Templating: Jinja2 (`templates/`)
- Frontend: Static HTML + `static/css/main.css` + `static/js/main.js`
- Database: MongoDB via PyMongo (`src/db`)
- Email: SMTP (optional) via `src/services/mail.py`

## Folder Structure (top level)
- `app.py` — Flask entrypoint, registers routes/blueprints.
- `config.py` — Environment/config loader (Mongo URI, SMTP, display emails).
- `templates/` — Jinja2 HTML pages (`base.html`, `index.html`, `error.html`).
- `static/` — Frontend assets (`css/main.css`, `js/main.js`, `img/`).
- `src/routes/` — Flask route handlers (`public.py`, `api.py`).
- `src/db/` — Mongo client and collection helpers.
- `src/services/` — Mail helper for contact notifications.
- `docs/` — Project documentation.
- `.env.example` — Sample environment variables.
- `requirements.txt` — Python dependencies.

Full per-file descriptions live in `docs/FILE_MAP.md`.

## Run Locally (beginner-safe)
1. Install Python 3.10+.
2. In the project root, create and activate a virtualenv:
   - `python -m venv .venv && source .venv/bin/activate` (macOS/Linux)
   - `python -m venv .venv && .venv\\Scripts\\activate` (Windows)
3. Install dependencies: `pip install -r requirements.txt`.
4. Copy env file: `cp .env.example .env` (or `Copy-Item .env.example .env` on PowerShell).
5. Edit `.env`:
   - Set `MONGO_URI` (required) and `DB_NAME` if you want a custom database name.
   - Optional: set SMTP values (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`) to send contact emails.
   - Optional: set `FOUNDER_EMAIL`, `TECH_EMAIL` for the contact tiles.
6. Start the app: `python app.py` (runs on port 5001 by default).
7. Open `http://localhost:5001` in a browser.

## Deployment (simple)
- Ensure environment variables from `.env.example` are set in your hosting environment.
- Run the app with a production server, e.g.:
  - `gunicorn -w 4 app:app` (Unix) or `waitress-serve --port=5001 app:app` (Windows-friendly).
- Point your process manager/reverse proxy (nginx/Apache) to the chosen port.

## Where things live
- HTML/Jinja: `templates/index.html` (single-page site) extending `templates/base.html`.
- Backend logic: `src/routes/public.py` (pages) and `src/routes/api.py` (APIs).
- MongoDB config: `config.py` and connection helpers in `src/db/client.py`.
- Content edits: mostly inside `templates/index.html` (hero text, manifesto tiles, values, systems, services, profiles, contact form labels). See `docs/EDITING_GUIDE.md` for exact locations.
- Theme: CSS variables in `static/css/main.css` and toggle logic in `static/js/main.js` (navbar button). Default is dark; user choice (light/dark) is saved to `localStorage`.

## Quick editing tips (no code changes)
- Hero text: edit the `<h1>` and `<p>` tags in `templates/index.html` under the `hero` section.
- Manifesto cards: edit the `manifesto_pillars` list inside `templates/index.html`.
- Values tiles: edit the `values_pillars` list inside `templates/index.html`.
- Systems/Services: edit the inline content in their respective sections in `templates/index.html`.
- Colors/fonts: adjust CSS tokens at the top of `static/css/main.css`.
