import hashlib
from os import environ
from typing import Tuple

from app.configs.constants import AUTH_FAILURE, AUTH_SUCCESS, FAILED, SUCCESS
from app.models import execute_db
from app.models.User import User
from flask import Blueprint, request, session
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
    if session.get("user"):
        return AUTH_SUCCESS, 200
    elif len(request.json) == 3:
        password: str = request.json["password"]
        user = await User.get_or_none(
            user_name=request.json["user_name"],
            password=hashlib.pbkdf2_hmac(
                hash_name="sha384",
                password=password.encode(),
                salt=bytes.fromhex(environ.get("SALT_VALUE")),
                iterations=350,
            ).hex(),
        )
        if user:
            session["user"] = request.json["user_name"]
            return {**SUCCESS, **AUTH_SUCCESS}, 200
        else:
            return {**FAILED, **AUTH_FAILURE}, 400
    else:
        return AUTH_FAILURE, 400


@api_router.post("/user")
@execute_db
async def create_user():
    if len(request.json) == 4:
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
        return SUCCESS
    else:
        return FAILED, 400


@api_router.delete("/user")
@execute_db
async def delete_user():
    if len(request.json) == 1 and "id" in request.json:
        user: User = await User.get_or_none(id=request.json["id"])

        return SUCCESS if user and await user.delete() is None else FAILED
    else:
        return FAILED, 400
