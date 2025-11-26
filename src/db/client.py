"""
MongoDB client bootstrap using PyMongo.
"""
from typing import Optional
from pymongo import MongoClient
from config import Config

_client: Optional[MongoClient] = None


def get_client() -> MongoClient:
  global _client
  if _client is None:
    _client = MongoClient(Config.MONGO_URI)
  return _client


def get_db():
  return get_client()[Config.DB_NAME]


__all__ = ["get_client", "get_db"]
