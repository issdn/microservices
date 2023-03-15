from typing import Optional
from pydantic import BaseModel, constr, Extra


class Group(BaseModel):
    name: constr(max_length=128, min_length=1, regex=r"^[a-zA-Z0-9_]+$")
    token: constr(max_length=32, min_length=32)
    avatar_url: Optional[str]


class GroupDTO(BaseModel):
    name: constr(max_length=128, min_length=1, regex=r"^[a-zA-Z0-9_]+$")
    avatar_url: Optional[str]


class CreateGroupDTO(BaseModel):
    message: str = "Group created successfully"
    token: constr(max_length=32, min_length=32)
    id: int


class EditGroupDTO(BaseModel):
    message: str = "Group updated successfully"
    name: Optional[constr(max_length=128, min_length=1,
                          regex=r"^[a-zA-Z0-9_]+$")]
    avatar_url: Optional[str]
