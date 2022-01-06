from app.models.User import User
from flask import Blueprint, render_template

home_route = Blueprint("home_api", __name__)


@home_route.get("/")
async def home_page():
    User.create_table()
    user = User(user_name="utkarsh", email="utkarsh.mishra", password="sample")
    user.save()
    print(user.toDict())
    return render_template("index.html", user=user.toDict())
