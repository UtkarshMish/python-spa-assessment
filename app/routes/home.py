from dataclasses import asdict

from app.models import execute_db
from app.models.User import User
from flask import Blueprint, render_template

home_route = Blueprint("home_api", __name__)


@home_route.route("/")
@home_route.route("/<path:path>")
def home_page(path=None):
    return render_template("index.html")
