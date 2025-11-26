"""
Render the Flask Jinja templates into a static HTML bundle for GitHub Pages.

Outputs:
- docs/index.html
- docs/static/ (copied from static/)
- docs/.nojekyll to bypass Jekyll processing
"""
from __future__ import annotations

import shutil
from pathlib import Path

from jinja2 import Environment, FileSystemLoader

ROOT = Path(__file__).resolve().parent.parent
DOCS_DIR = ROOT / "docs"
TEMPLATES_DIR = ROOT / "templates"
STATIC_DIR = ROOT / "static"


def url_for(endpoint: str, filename: str | None = None) -> str:
  if endpoint == "static" and filename:
    return f"static/{filename}"
  raise ValueError(f"Unsupported endpoint: {endpoint}")


def build():
  DOCS_DIR.mkdir(exist_ok=True)

  env = Environment(loader=FileSystemLoader(str(TEMPLATES_DIR)))
  env.globals["url_for"] = url_for

  contact_emails = {
    "general": "general@dasein.works",
    "founder": "pamela@dasein.works",
    "tech": "shreyas@dasein.works",
  }
  placeholder_flags = {key: "to-be-set" in value for key, value in contact_emails.items()}

  html = env.get_template("index.html").render(
    contact_emails=contact_emails,
    placeholder_flags=placeholder_flags,
  )
  (DOCS_DIR / "index.html").write_text(html, encoding="utf-8")

  static_target = DOCS_DIR / "static"
  if static_target.exists():
    shutil.rmtree(static_target)
  shutil.copytree(STATIC_DIR, static_target)

  (DOCS_DIR / ".nojekyll").touch()
  print("Static site built to:", DOCS_DIR)


if __name__ == "__main__":
  build()
