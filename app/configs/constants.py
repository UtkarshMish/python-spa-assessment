from typing import Dict, Literal

AUTH_SUCCESS = {"auth": True}
AUTH_FAILURE = {"auth": False}
SUCCESS: Dict[Literal["success"], bool] = {"success": True}
FAILED: Dict[Literal["success"], bool] = {"success": False}
