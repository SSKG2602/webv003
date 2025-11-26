# File Map

Use this as a path-by-path guide to find or edit content.

## Top level
- `app.py` — Flask entrypoint; registers blueprints and checks Mongo connectivity.
- `config.py` — Loads environment variables (Mongo, SMTP, emails, port).
- `requirements.txt` — Python dependencies.
- `.env.example` — Sample env file to copy to `.env`.
- `__pycache__/` — Python bytecode cache (safe to ignore/delete).
- `docs/` — All documentation (see below for individual files).

## Templates (HTML/Jinja)
- `templates/base.html` — Shared layout: `<head>`, fonts, navbar links, script/style includes, `{% block content %}` and `{% block footer %}`.
- `templates/index.html` — Single-page site with all sections:
  - Hero section (headline, subtext, buttons).
  - Values (“What We Stand For”) section with 5 tiles (`values_pillars` list).
  - Manifesto (“Our Manifesto / The Dasein Principles”) with 8 cards (`manifesto_pillars` list).
  - Systems, Services, Projects sections (cards defined inline in lists).
  - About section (founder/co-founder bios, modals).
  - Contact section (email chips + contact form).
  - Footer (waitlist form).
- `templates/error.html` — Basic error display extending `base.html`.

## Static assets
- `static/css/main.css` — Global styles, theme variables (`.theme-dark`/`.theme-light`), layout rules, section/card styling, responsive grids.
- `static/js/main.js` — Frontend behaviors: smooth scrolling, reveals, profile overlays, modal handling, contact/subscribe form submission (fetch calls to `/api/contact` and `/api/subscribe`), toasts, and theme toggle persistence.
- `static/img/` — Placeholder for images (currently empty).

## Backend (Python)
- `src/routes/public.py` — Public routes; currently serves `/` with contact email context.
- `src/routes/api.py` — API endpoints: `/api/health`, `/api/contact`, `/api/subscribe` with validation and DB calls.
- `src/db/client.py` — MongoDB client setup and `get_db()` helper.
- `src/db/models.py` — Collection helpers for `contacts` and `subscribers`, including unique index on subscriber email.
- `src/services/mail.py` — SMTP helper for sending contact notification emails.
- `src/__init__.py`, `src/routes/__init__.py`, `src/db/__init__.py`, `src/services/__init__.py` — Package markers/exports.

## Docs
- `docs/README.md` — Overview, tech stack, run steps, deployment, edit tips.
- `docs/ARCHITECTURE.md` — App flow, lifecycle, template inheritance, section map.
- `docs/ROUTES.md` — Route table with handlers, responses, and DB touch points.
- `docs/MODELS.md` — Mongo collections and key fields.
- `docs/MIGRATION_MAP.md` — Mapping from the original project to this one.
- `docs/FIGMA_NOTES.md` — Quick map for designers between code and Figma.
- `docs/FILE_MAP.md` — This file (path guide).
- `docs/EDITING_GUIDE.md` — How to edit text/content safely.
- `docs/STYLE_GUIDE.md` — Naming and styling conventions.
- `docs/STYLE_SYSTEM.md` — Theme variables, card system, spacing, and hierarchy.
- `docs/THEME_GUIDE.md` — How the light/dark themes work and where to change colors.
