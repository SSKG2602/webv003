# Routes

| Method | Path | Handler | Returns | Touches DB | Notes |
| --- | --- | --- | --- | --- | --- |
| GET | `/` | `src.routes.public.home` | Renders `templates/index.html` | No | Passes contact emails (from env) into the template. |
| GET | `/api/health` | `src.routes.api.health` | JSON `{"status": "ok"}` | No | Health check for uptime/monitoring. |
| POST | `/api/contact` | `src.routes.api.create_contact` | JSON `{ success, message | error }` | Writes to `contacts` | Validates name/email/topic/message; also sends SMTP email if configured. |
| POST | `/api/subscribe` | `src.routes.api.create_subscription` | JSON `{ success, message | error }` | Writes to `subscribers` | Validates email; idempotent (returns success if already subscribed). |
