# Models / Collections

- **contacts**  
  - Fields: `name`, `email`, `topic`, `message`, `createdAt` (Date).  
  - Stores contact form submissions and powers email notifications.

- **subscribers**  
  - Fields: `email` (unique), `source` (e.g., `footer`), `createdAt` (Date).  
  - Stores newsletter/waitlist signups; idempotent on email.
