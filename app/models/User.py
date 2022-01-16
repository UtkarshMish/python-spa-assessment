from dataclasses import dataclass
from datetime import datetime
from typing import Optional

from tortoise.fields import CharField, DatetimeField, IntField
from tortoise.models import Model


@dataclass(init=False)
class User(Model):
    id: Optional[IntField] = IntField(pk=True, generated=True)
    user_name: str = CharField(150)
    email: str = CharField(200, unique=True)
    password: str = CharField(255)
    created_on: datetime = DatetimeField(auto_now_add=True)
    modified_on: datetime = DatetimeField(True)
