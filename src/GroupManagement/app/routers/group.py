import os
import secrets
import requests

from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.security import APIKeyCookie
from app.models.group import CreateGroupDTO

from app.db_manager import SessionContextManager
from app.models.group import GroupDTO, Group
import mysql.connector.errors

from dotenv import load_dotenv
load_dotenv()

router = APIRouter(prefix="/group/v1", tags=["Group"])


def generate_group_url():
    return secrets.token_urlsafe(24)


SESSION_JWT_TOKEN_NAME = "sessionJwtToken"


def check_jwt_session(sessionJwtToken: str, url: str = os.getenv("USER_MSC_URL") + "/user/v1/auth/session") -> int:
    response = requests.api.get(
        url, cookies={SESSION_JWT_TOKEN_NAME: sessionJwtToken})
    if response.status_code != 200:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return response.json()["id"]


@router.get("/")
def get_groups(limit: int = 0):
    with SessionContextManager(detail="Couldn't get groups.") as session:
        return session.get_all_groups(limit)


@router.get("/{group_id}")
def get_group(group_id: int):
    with SessionContextManager(detail=f"Couldn't find a group with id: {group_id}.") as session:
        return session.get_group(group_id)


@router.post("/{user_id}")
def create_group(user_id: int, group: GroupDTO, sessionJwtToken: str = Depends(APIKeyCookie(name=SESSION_JWT_TOKEN_NAME))):
    check_jwt_session(sessionJwtToken)
    try:
        with SessionContextManager(detail="Couldn't create a group.") as session:
            token = generate_group_url()
            id = session.add_group(user_id, Group(
                **group.dict(), token=token))
            return CreateGroupDTO(message="Group created successfully", id=id, token=token)
    except mysql.connector.errors.IntegrityError:
        raise HTTPException(status_code=409, detail="Group already exists")


@router.delete("/{group_id}")
def delete_group(group_id: int, sessionJwtToken: str = Depends(APIKeyCookie(name=SESSION_JWT_TOKEN_NAME))):
    user_id = check_jwt_session(sessionJwtToken)
    with SessionContextManager(detail=f"Couldn't delete a group with id: {group_id}.") as session:
        session.delete_group(group_id, user_id)
        return {"message": "Group deleted successfully"}


@router.put("/{user_id}")
def update_group(user_id: int, group: GroupDTO, sessionJwtToken: str = Depends(APIKeyCookie(name=SESSION_JWT_TOKEN_NAME))):
    check_jwt_session(sessionJwtToken)
    with SessionContextManager(detail=f"Couldn't update a group with id: {group.id}.") as session:
        session.update_group(user_id, group)
        return {"message": "Group updated successfully"}


@router.get("/user/{user_id}")
def get_user_groups(user_id: int):
    with SessionContextManager(detail=f"Couldn't get groups by id: {user_id}.") as session:
        return session.get_groups_by_user_id(user_id)


@router.post("/join/{group_token}")
def join_group(group_token: str, sessionJwtToken: str = Depends(APIKeyCookie(name=SESSION_JWT_TOKEN_NAME))):
    user_id = check_jwt_session(sessionJwtToken)
    with SessionContextManager(detail=f"Couldn't join a group with token: {group_token}.") as session:
        group = session.join_group(group_token, user_id)
        return Group(id=group["id"], name=group["name"], token=group["token"], avatar_url=group["avatar_url"])


@router.delete("/leave/{group_id}")
def leave_group(group_id: int, sessionJwtToken: str = Depends(APIKeyCookie(name=SESSION_JWT_TOKEN_NAME))):
    user_id = check_jwt_session(sessionJwtToken)
    with SessionContextManager(detail=f"Couldn't leave a group with id: {group_id}.") as session:
        session.leave_group(group_id, user_id)
        return {"message": "Left group successfully"}
