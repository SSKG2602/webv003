"""
Flask entrypoint for the migrated Dasein site.
"""
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from werkzeug.exceptions import HTTPException
from config import Config
from src.routes.public import public_bp
from src.routes.api import api_bp
from src.db.client import get_client


def create_app() -> Flask:
  app = Flask(
    __name__,
    static_folder="static",
    template_folder="templates"
  )
  app.config.from_object(Config)

  CORS(app)

  app.register_blueprint(public_bp)
  app.register_blueprint(api_bp, url_prefix="/api")

  # Eagerly validate Mongo connectivity to mirror the original startup behavior.
  try:
    get_client().admin.command("ping")
    print("MongoDB connected")
  except Exception as exc:  # noqa: BLE001
    print("Failed to connect to MongoDB", exc)
    raise

  @app.errorhandler(Exception)
  def handle_error(err: Exception):
    if isinstance(err, HTTPException):
      code = err.code or 500
      if request.path.startswith("/api/"):
        return jsonify({"success": False, "error": err.description}), code
      return render_template("error.html", error=err), code

    # Generic fallback mirrors original server error handler.
    print(err)
    if request.path.startswith("/api/"):
      return jsonify({"success": False, "error": "Server error"}), 500
    return render_template("error.html", error=err), 500

  return app


app = create_app()


if __name__ == "__main__":
  app.run(host="0.0.0.0", port=Config.PORT, debug=Config.NODE_ENV != "production")
