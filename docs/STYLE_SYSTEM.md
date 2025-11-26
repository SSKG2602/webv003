# Style System

## Theme variables
Defined in `static/css/main.css` under `.theme-dark` (default) and `.theme-light`:
- `--background`: Page background.
- `--surface-primary`: Brighter surface for hero, values, manifesto, contact form.
- `--surface-secondary`: Neutral surface for secondary sections (systems/services/projects/about).
- `--surface-soft`: Supporting surface (panels/visuals).
- `--border-subtle`: Light borders for cards, nav, dividers.
- `--text-main`: Primary text color.
- `--text-muted`: Secondary text color.
- `--accent`: Primary accent (buttons, badges).
- `--accent-soft`: Secondary accent.
- `--accent-on`: Text on accent backgrounds.

## Card system
- Base `.card`: shared radius (15px), padding, subtle border, soft lift on hover.
- `.card-primary`: uses `--surface-primary` gradient for primary sections.
- `.card-secondary`: uses `--surface-secondary` gradient for secondary sections.
- Hover: tiny lift (translateY -2px) and gentle border highlight.

## Layout & spacing
- Sections: `padding: 120px 0 132px` (mobile reduced). Primary/secondary sections use the same rhythm.
- Grids: `.card-grid`, `.manifesto-grid` with consistent gaps (22px) and 2 columns on tablet/desktop.
- Section headers: `.section-header` with `eyebrow-label`, `section-title`, `section-subtitle` for consistent hierarchy.

## Section hierarchy
- Primary sections (hero, values, manifesto, contact) use `.primary-section` and `card-primary`.
- Secondary sections (systems, services, projects, about) use `.secondary-section` with muted header gradient and `card-secondary`.

## Buttons
- `.btn`, `.btn-primary`, `.btn-outline`, `.btn-ghost`: pill shape, 1px outline, subtle hover lift (translateY -1px), accent-driven fills.

## Patterns & accents
- Values section includes a faint grid pattern via a `::before` overlay.
- Section headers in secondary sections have a light gradient anchor.

## Hero Concept Emblem – Continuum Line
- Meaning: Quiet symbol showing a continuous line that lifts gently upward — “AI stays aligned with human direction.”
- Location: Hero right card in `templates/index.html` (`.hero-visual` → `.emblem` with SVG + caption).
- Colors: Uses `--accent` (dark) and a slightly darker teal in light mode via CSS. Caption uses `--text-muted`.
- Behavior: Static by design; no animations. Any future interaction must remain extremely subtle.
- Do not replace the caption with marketing slogans; it is part of the concept. Keep the line minimal and calm.
