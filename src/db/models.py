"""
Thin helpers around MongoDB collections to mirror the original Mongoose models.
"""
from datetime import datetime
from pymongo.collection import Collection
from pymongo.errors import DuplicateKeyError
from .client import get_db

_subscriber_index_created = False


def get_contacts_collection(db=None) -> Collection:
  db = db or get_db()
  return db.get_collection("contacts")


def get_subscribers_collection(db=None) -> Collection:
  db = db or get_db()
  collection = db.get_collection("subscribers")

  global _subscriber_index_created
  if not _subscriber_index_created:
    collection.create_index("email", unique=True)
    _subscriber_index_created = True

  return collection


def insert_contact(name: str, email: str, topic: str, message: str):
  """Persist a contact record with createdAt mirroring the original schema."""
  contacts = get_contacts_collection()
  payload = {
    "name": name,
    "email": email,
    "topic": topic,
    "message": message,
    "createdAt": datetime.utcnow(),
  }
  return contacts.insert_one(payload)


def find_subscriber_by_email(email: str):
  subscribers = get_subscribers_collection()
  return subscribers.find_one({"email": email})


def insert_subscriber(email: str, source: str):
  subscribers = get_subscribers_collection()
  payload = {"email": email, "source": source, "createdAt": datetime.utcnow()}
  try:
    return subscribers.insert_one(payload)
  except DuplicateKeyError:
    return None


__all__ = [
  "get_contacts_collection",
  "get_subscribers_collection",
  "insert_contact",
  "find_subscriber_by_email",
  "insert_subscriber",
]
