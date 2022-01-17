from dataclasses import asdict

from app.models import execute_db
from app.models.User import User
from flask import Blueprint, redirect, render_template, session

home_route = Blueprint("home_api", __name__)


@home_route.route("/")
@home_route.route("/<path:path>")
def home_page(path=None):
    if path == "logout":
        session.clear()
        return redirect("/")
    return render_template("index.html")
