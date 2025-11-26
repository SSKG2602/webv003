"""
Configuration loader for the Flask application.

Mirrors the original Node.js env expectations while exposing them in Python.
"""
import os
from dotenv import load_dotenv

load_dotenv()


def _require(key: str) -> str:
  """Return env value or raise to mirror original required vars."""
  value = os.getenv(key)
  if value is None or value == "":
    raise ValueError(f"Missing required environment variable: {key}")
  return value


class Config:
  PORT: int = int(os.getenv("PORT", "5001"))
  MONGO_URI: str = _require("MONGO_URI")
  DB_NAME: str = os.getenv("DB_NAME", "dasein")

  SMTP_HOST: str = os.getenv("SMTP_HOST", "")
  SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
  SMTP_USER: str = os.getenv("SMTP_USER", "")
  SMTP_PASS: str = os.getenv("SMTP_PASS", "")
  CONTACT_TO_EMAIL: str = os.getenv("CONTACT_TO_EMAIL", "general@dasein.works")

  FOUNDER_EMAIL: str = os.getenv("FOUNDER_EMAIL", "founder@to-be-set")
  TECH_EMAIL: str = os.getenv("TECH_EMAIL", "tech@to-be-set")

  NODE_ENV: str = os.getenv("NODE_ENV", "development")


__all__ = ["Config"]
