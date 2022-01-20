import hashlib
from os import environ

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
    elif request.json and len(request.json) == 3:
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
            return {**FAILED, **AUTH_FAILURE}, 200
    else:
        return AUTH_FAILURE, 200


@api_router.post("/user")
@execute_db
async def create_user():
    if request.json and len(request.json) == 4 and session.get("user") is None:
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
    if request.json and len(request.json) == 1 and "id" in request.json:
        user: User = await User.get_or_none(id=request.json["id"])

        return SUCCESS if user and await user.delete() is None else FAILED
    else:
        return FAILED, 400


@api_router.post("/mobile-number")
@execute_db
async def get_mobile():
    if request.json and len(request.json) == 1 and "mobile" in request.json:
        user: User = await User.get(user_name=session.get("user"))
        user.mobile_number = request.json["mobile"]
        return SUCCESS if user and await user.save() is None else FAILED
    elif session.get("user"):
        user: User = await User.get_or_none(user_name=session.get("user"))
        return {"message": False if user.mobile_number is None else True}
    else:
        return FAILED, 400


@api_router.post("/forgot-password")
@execute_db
async def get_user():
    if request.json and len(request.json) == 2 or len(request.json) == 3:
        user: User = await User.get(
            email=request.json["email"], mobile_number=int(request.json["mobileNumber"])
        )
        if user and request.json.get("newPassword"):
            password = request.json["newPassword"]
            user.password = hashlib.pbkdf2_hmac(
                hash_name="sha384",
                password=password.encode(),
                salt=bytes.fromhex(environ.get("SALT_VALUE")),
                iterations=350,
            ).hex()
            return {"message": True if await user.save() is None else False}
        return {"message": True if user else False}
    else:
        return FAILED, 400
