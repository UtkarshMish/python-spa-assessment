from flask import Blueprint, make_response, redirect, render_template, session

home_route = Blueprint("home_api", __name__)


@home_route.route("/", defaults={"path": ""})
@home_route.route("/<path:path>")
def home_page(path=None):
    if path == "logout":
        session.clear()
        return redirect("/")
    return make_response(render_template("index.html"), 200)
