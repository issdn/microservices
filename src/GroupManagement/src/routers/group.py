import logging
import os
import traceback

from fastapi import HTTPException, APIRouter

from GroupManagement.src.db_context import SessionContextManager
from GroupManagement.src.models.group import GroupDTO

router = APIRouter(prefix="/group", tags=["Group"])

logging.basicConfig(filename=os.getenv("DB_LOGGER_FILE"))


def handle_exception(e: BaseException, status_code=500, detail="Internal server error."):
    if os.getenv("ENVIRONMENT").lower() == "production":
        msg = getattr(e, "message", str(e))
        logging.error(
            msg + "\n" + "".join(traceback.format_exception(e)))
        raise HTTPException(status_code=status_code, detail=detail)
    else:
        raise e


@router.post("/{user_id}")
def create_group(user_id: int, group: GroupDTO):
    try:
        with SessionContextManager() as session:
            session.insert_one(user_id, group)
            return {"message": "Group created successfully"}
    except HTTPException as e:
        raise e
    except BaseException as e:
        handle_exception(e, detail="Couldn't create a group.")


@router.get("/{id}")
def get_group(id: int):
    try:
        with SessionContextManager() as session:
            return session.one(id)
    except HTTPException as e:
        raise e
    except BaseException as e:
        handle_exception(e, detail=f"Couldn't find a group with id: {id}.")


@router.get("/")
def get_groups(limit: int = 0):
    try:
        with SessionContextManager() as session:
            return session.all(limit)
    except HTTPException as e:
        raise e
    except BaseException as e:
        handle_exception(e, detail="Couldn't get groups.")


@router.delete("/{id}")
def delete_group(id: int):
    try:
        with SessionContextManager() as session:
            session.delete(id)
            return {"message": "Group deleted successfully"}
    except HTTPException as e:
        raise e
    except BaseException as e:
        handle_exception(e, detail=f"Couldn't delete a group with id: {id}.")


@router.put("/{id}")
def update_group(id: int, group: GroupDTO):
    try:
        with SessionContextManager() as session:
            session.update(id, group)
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
            return session.get_groups_by_id(user_id)
    except HTTPException as e:
        raise e
    except BaseException as e:
        handle_exception(e, detail=f"Couldn't get groups by id: {id}.")
