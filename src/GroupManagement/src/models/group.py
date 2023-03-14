from pydantic import BaseModel, constr


class Group(BaseModel):
    name: constr(max_length=128, min_length=1, regex=r"^[a-zA-Z0-9_]+$")


class GroupDTO(Group):
    ...
