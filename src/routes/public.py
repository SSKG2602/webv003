from flask import Blueprint, render_template
from config import Config

public_bp = Blueprint("public", __name__)


def _build_contact_emails():
  emails = {
    "general": "general@dasein.works",
    "founder": Config.FOUNDER_EMAIL,
    "tech": Config.TECH_EMAIL,
  }
  placeholders = {key: "to-be-set" in value for key, value in emails.items()}
  return emails, placeholders


@public_bp.route("/")
def home():
  contact_emails, placeholder_flags = _build_contact_emails()
  return render_template(
    "index.html",
    contact_emails=contact_emails,
    placeholder_flags=placeholder_flags,
  )
