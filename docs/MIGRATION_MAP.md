# Migration Map

| OLD (Parent/Nowebsite) | NEW (Parent/FigmatobedoneWebsite) |
| --- | --- |
| `server/src/index.ts` | `app.py` |
| `server/src/config/env.ts` | `config.py` |
| `server/src/config/db.ts` | `src/db/client.py` |
| `server/src/models/Contact.ts` | `src/db/models.py` (`contacts` helpers) |
| `server/src/models/Subscriber.ts` | `src/db/models.py` (`subscribers` helpers) |
| `server/src/controllers/contactController.ts` | `src/routes/api.py` + `src/services/mail.py` |
| `server/src/controllers/subscribeController.ts` | `src/routes/api.py` |
| `server/src/routes/contactRoutes.ts` | `src/routes/api.py` (`/api/contact`) |
| `server/src/routes/subscribeRoutes.ts` | `src/routes/api.py` (`/api/subscribe`) |
| `server/src/routes/healthRoutes.ts` | `src/routes/api.py` (`/api/health`) |
| `client/src/App.tsx` | `templates/index.html` |
| `client/src/components/layout/Navbar.tsx` | `templates/base.html` (header) |
| `client/src/components/layout/Footer.tsx` | `templates/index.html` footer + `static/js/main.js` |
| `client/src/components/sections/*` | `templates/index.html`, `static/css/main.css`, `static/js/main.js` |
| `client/src/config/apiConfig.ts` | `static/js/main.js` (fetch helpers) |
| `client/src/theme/index.ts` | `static/css/main.css` |
