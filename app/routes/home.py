from dataclasses import asdict

from app.models import execute_db
from app.models.User import User
from flask import Blueprint, render_template

home_route = Blueprint("home_api", __name__)


@home_route.get("/")
@execute_db
async def home_page():
    user_list = [asdict(user) for user in await User.all()]
    return render_template("index.html", user=user_list)
