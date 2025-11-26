"""
Mail helper for contact notifications.
"""
import smtplib
from email.message import EmailMessage
from config import Config


def send_contact_notification(payload: dict):
  """
  Send notification email mirroring the original Nodemailer behavior.
  Raises on failure to keep API semantics identical to the Node backend.
  """
  if not Config.SMTP_HOST:
    raise RuntimeError("SMTP_HOST is not configured.")

  msg = EmailMessage()
  msg["Subject"] = f"New Dasein contact: {payload.get('topic')}"
  msg["From"] = Config.SMTP_USER or Config.CONTACT_TO_EMAIL
  msg["To"] = Config.CONTACT_TO_EMAIL
  msg.set_content(
    "New contact submission:\n\n"
    f"Name: {payload.get('name')}\n"
    f"Email: {payload.get('email')}\n"
    f"Topic: {payload.get('topic')}\n\n"
    f"Message:\n{payload.get('message')}\n"
  )

  if Config.SMTP_PORT == 465:
    server_cls = smtplib.SMTP_SSL
  else:
    server_cls = smtplib.SMTP

  with server_cls(Config.SMTP_HOST, Config.SMTP_PORT) as server:
    if Config.SMTP_PORT != 465:
      server.starttls()
    if Config.SMTP_USER:
      server.login(Config.SMTP_USER, Config.SMTP_PASS)
    server.send_message(msg)


__all__ = ["send_contact_notification"]
