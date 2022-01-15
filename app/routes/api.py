import hashlib
from os import environ
from typing import Tuple

from app.models import execute_db
from app.models.User import User
from flask import Blueprint, request
from tortoise.exceptions import IntegrityError

api_router = Blueprint("api", __name__, url_prefix="/api")


@api_router.errorhandler(KeyError)
def handle_index_error(err: KeyError):

    return {"success": False, "err": err.args}, 400


@api_router.errorhandler(IntegrityError)
def handle_integrity_error(err: IntegrityError):
    return {"success": False, "err": str(err)}, 400


@api_router.post("/auth")
@execute_db
async def check_user():
    if len(request.json) == 2:
        password: str = request.json["password"]
        user = await User.filter(
            user_name=request.json["user_name"],
            password=hashlib.pbkdf2_hmac(
                hash_name="sha384",
                password=password.encode(),
                salt=bytes.fromhex(environ.get("SALT_VALUE")),
                iterations=350,
            ).hex(),
        )
        return ({"success": True}, 200) if len(user) > 0 else ({"success": False}, 400)
    else:
        return {"success": False}, 400


@api_router.post("/user")
@execute_db
async def create_user():
    if len(request.json) == 3:
        password: str = request.json["password"]
        await User.create(
            user_name=request.json["user_name"],
            email=request.json["email"],
            password=hashlib.pbkdf2_hmac(
                hash_name="sha384",
                password=password.encode(),
                salt=bytes.fromhex(environ.get("SALT_VALUE")),
                iterations=350,
            ).hex(),
        )
        return {"success": True}
    else:
        return {"success": False}, 400


@api_router.delete("/user")
@execute_db
async def delete_user():
    if len(request.json) == 1 and "id" in request.json:
        user: User = await User.get_or_none(id=request.json["id"])

        return (
            {"success": True}
            if user and await user.delete() is None
            else {"success": False}
        )
    else:
        return {"success": False}, 400
