# Figma Notes

- Each section in `templates/index.html` maps 1:1 to Figma frames: hero, manifesto, values, systems, services, projects, about, contact, footer.
- Shared chrome (navbar, fonts, spacing) lives in `templates/base.html`; mirrors global styles/tokens.
- Reusable card styles, badges, and grids are defined in `static/css/main.css` so colors/radii/shadows match Figma components.
- Animations and scroll reveals are handled in `static/js/main.js` using data attributes on the HTML blocks.
- Manifesto/value cards and system/service/project grids correspond to repeated Figma components; badges mirror status chips.
- Founder/Co-founder overlays and modals are driven by the `.profile-card` markup in `templates/index.html` plus modal blocks at the bottom of the file.
- Contact and waitlist forms are in `templates/index.html` with fetch logic in `static/js/main.js`; layout/styling tokens are in `static/css/main.css`.
- Color/typography tokens are centralized at the top of `static/css/main.css` for easy design review.
