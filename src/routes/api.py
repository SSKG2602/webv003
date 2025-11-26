import re
from flask import Blueprint, jsonify, request
from src.db import models
from src.services.mail import send_contact_notification

api_bp = Blueprint("api", __name__)

EMAIL_REGEX = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


def _validate_contact_payload(data):
  raw_name = data.get("name") or ""
  raw_email = data.get("email") or ""
  raw_topic = data.get("topic") or ""
  raw_message = data.get("message") or ""

  name = raw_name.strip() if isinstance(raw_name, str) else ""
  message = raw_message.strip() if isinstance(raw_message, str) else ""
  email = raw_email if isinstance(raw_email, str) else ""
  topic = raw_topic if isinstance(raw_topic, str) else ""

  if not name or not email or not topic or not message:
    return "All fields are required."
  if len(name) < 2 or len(name) > 100:
    return "Name must be between 2 and 100 characters."
  if not EMAIL_REGEX.match(email):
    return "Invalid email address."
  if len(message) < 10 or len(message) > 2000:
    return "Message must be between 10 and 2000 characters."
  return None


def _validate_subscription_payload(data):
  email = data.get("email")
  if not email or not isinstance(email, str):
    return "Email is required."
  if not EMAIL_REGEX.match(email):
    return "Invalid email address."
  return None


@api_bp.route("/health", methods=["GET"])
def health():
  return jsonify({"status": "ok"}), 200


@api_bp.route("/contact", methods=["POST"])
def create_contact():
  data = request.get_json(silent=True) or {}
  error = _validate_contact_payload(data)
  if error:
    return jsonify({"success": False, "error": error}), 400

  try:
    models.insert_contact(data["name"], data["email"], data["topic"], data["message"])
    send_contact_notification(
      {
        "name": data["name"],
        "email": data["email"],
        "topic": data["topic"],
        "message": data["message"],
      }
    )
    return jsonify({"success": True, "message": "Contact message received."}), 201
  except Exception as exc:  # noqa: BLE001
    print(exc)
    return jsonify({"success": False, "error": "Server error"}), 500


@api_bp.route("/subscribe", methods=["POST"])
def create_subscription():
  data = request.get_json(silent=True) or {}
  error = _validate_subscription_payload(data)
  if error:
    return jsonify({"success": False, "error": error}), 400

  email = data["email"]
  source = data.get("source") or "footer"
  try:
    existing = models.find_subscriber_by_email(email)
    if existing:
      return jsonify({"success": True, "message": "Already subscribed."}), 200

    models.insert_subscriber(email, source)
    return jsonify({"success": True, "message": "Subscribed."}), 201
  except Exception as exc:  # noqa: BLE001
    print(exc)
    return jsonify({"success": False, "error": "Server error"}), 500
