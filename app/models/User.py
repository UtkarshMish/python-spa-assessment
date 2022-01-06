from dataclasses import dataclass
from typing import Dict, Literal

from app.models import get_db
from pony.orm import Database, PrimaryKey, Required

db = Database("mysql")


@dataclass
class User(db.Entity):
    id: int = PrimaryKey(int)
    user_name: str = Required(str)
    email: str = Required(str)
    password: str = Required(bytes)

    def toDict(self) -> Dict[Literal["user_name", "email", "password"], str]:
        return self.__data__
