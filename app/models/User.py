from dataclasses import dataclass
from typing import Optional

from tortoise.fields import IntField, TextField
from tortoise.models import Model


@dataclass(init=False)
class User(Model):
    id: Optional[IntField] = IntField(pk=True, generated=True)
    user_name: str = TextField()
    email: str = TextField()
    password: str = TextField()
