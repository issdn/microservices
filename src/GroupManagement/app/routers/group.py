import logging
import os
import secrets
import traceback

from fastapi import HTTPException, APIRouter
from app.models.group import CreateGroupDTO

from app.db_manager import SessionContextManager
from app.models.group import GroupDTO, Group

router = APIRouter(prefix="/group/v1", tags=["Group"])

logging.basicConfig(filename=os.getenv("DB_LOGGER_FILE"))


def generate_group_url():
    return secrets.token_urlsafe(24)


def handle_exception(e: BaseException, status_code=500, detail="Internal server error."):
    if os.getenv("ENVIRONMENT").lower() == "production":
        msg = getattr(e, "message", str(e))
        logging.error(
            msg + "\n" + "".join(traceback.format_exception(e)))
        raise HTTPException(status_code=status_code, detail=detail)
    else:
        raise e


@router.get("/")
def get_groups(limit: int = 0):
    try:
        with SessionContextManager() as session:
            return session.get_all_groups(limit)
    except HTTPException as e:
        raise e
    except BaseException as e:
        handle_exception(e, detail="Couldn't get groups.")


@router.get("/{id}")
def get_group(id: int):
    try:
        with SessionContextManager() as session:
            return session.get_group(id)
    except HTTPException as e:
        raise e
    except BaseException as e:
        handle_exception(e, detail=f"Couldn't find a group with id: {id}.")


@router.post("/{user_id}")
def create_group(user_id: int, group: GroupDTO):
    try:
        with SessionContextManager() as session:
            token = generate_group_url()
            id = session.add_group(user_id, Group(
                **group.dict(), token=token))
            return CreateGroupDTO(message="Group created successfully", id=id, token=token)
    except HTTPException as e:
        raise e
    except BaseException as e:
        handle_exception(e, detail="Couldn't create a group.")


@router.delete("/{id}")
def delete_group(id: int):
    try:
        with SessionContextManager() as session:
            session.delete_group(id)
            return {"message": "Group deleted successfully"}
    except HTTPException as e:
        raise e
    except BaseException as e:
        handle_exception(e, detail=f"Couldn't delete a group with id: {id}.")


@router.put("/{id}")
def update_group(id: int, group: GroupDTO):
    try:
        with SessionContextManager() as session:
            session.update_group(id, group)
            return {"message": "Group updated successfully"}
    except HTTPException as e:
        raise e
    except BaseException as e:
        handle_exception(
            e, detail=f"Couldn't update a group with id: {group.id}.")


@router.get("/user/{user_id}")
def get_user_groups(user_id: int):
    try:
        with SessionContextManager() as session:
            return session.get_groups_by_user_id(user_id)
    except HTTPException as e:
        raise e
    except BaseException as e:
        handle_exception(e, detail=f"Couldn't get groups by id: {id}.")
