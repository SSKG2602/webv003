# Theme Guide

Light/Dark themes share the same structure and layouts; only palette values change.

## How it works
- The `<body>` has `theme-dark` (default) or `theme-light`.
- Theme variables are defined in `static/css/main.css` under `.theme-dark` and `.theme-light`.
- The navbar toggle (`#theme-toggle` in `templates/base.html`) switches classes and saves the choice to `localStorage` (`dasein-theme`).
- JS logic lives in `static/js/main.js` (`initThemeToggle`).

## Variables to edit (both themes)
- `--background`
- `--surface-primary`
- `--surface-secondary`
- `--surface-soft`
- `--border-subtle`
- `--text-main`
- `--text-muted`
- `--accent`
- `--accent-soft`
- `--accent-on`

## Where to change colors
- Open `static/css/main.css`.
- Update values under `.theme-dark` and `.theme-light` blocks (keep variable names identical).
- No HTML/JS changes are needed when adjusting colors.

## Tips
- Keep contrast high for text (`--text-main` vs `--background`/`--surface-*`).
- Use `--accent` sparingly (buttons, badges, toggle knob).
- Test both themes after changes; the toggle persists across reloads.
