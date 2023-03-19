import logging
import traceback
from fastapi import HTTPException
import mysql.connector.errors
from pydantic import BaseModel
import mysql.connector
import os


class ModelException(Exception):
    pass


class GroupDatabaseManager:
    def __init__(self):
        self.cnx = mysql.connector.connect(user=os.getenv("DB_USER"),
                                           password=os.getenv("DB_PASSWORD"),
                                           host=os.getenv("DB_HOST"),
                                           database=os.getenv("DB_NAME"),
                                           port=os.getenv("DB_PORT"))
        self.cur = self.cnx.cursor(dictionary=True)

    def add_group(self, user_id: int,  to_insert_object: BaseModel):
        fields, values = self._model_to_fields_and_values_string_parameters(
            to_insert_object)
        insert_group_query = f"INSERT INTO msc.group ({fields}, owner_id) VALUES ({values}, {user_id});"
        self.cur.execute(insert_group_query, tuple(
            to_insert_object.dict().values()))
        insert_user_group_query = "INSERT INTO msc.user_has_group (user_id, group_id) VALUES (%s, %s);"
        id = self.cur.lastrowid
        self.cur.execute(insert_user_group_query,
                         (user_id, id))
        return id

    def get_group(self, group_id: int):
        query = "SELECT * FROM msc.group WHERE id = %s;"
        self.cur.execute(query, (group_id,))
        return self.cur.fetchone()

    def get_all_groups(self, limit: int = 0):
        if limit > 0:
            query = f"SELECT * FROM msc.group LIMIT {limit};"
            self.cur.execute(query)
            return self.cur.fetchall()
        else:
            query = f"SELECT * FROM msc.group;"
            self.cur.execute(query)
            return self.cur.fetchall()

    def delete_group(self, group_id: int, user_id: int):
        check_if_user_is_owner_query = "SELECT * FROM msc.group WHERE id = %s AND owner_id = %s;"
        self.cur.execute(check_if_user_is_owner_query, (group_id, user_id,))
        group = self.cur.fetchone()
        if group is None:
            raise HTTPException(
                status_code=409, detail="User is not the owner of the group.")
        query = "DELETE FROM msc.group WHERE id = %s;"
        self.cur.execute(query, (group_id,))

    def update_group(self, id: int, to_edit_object: BaseModel):
        to_edit_object_dict = to_edit_object.dict()
        fields = (str(tuple("=".join([item, "%s"])
                  for item in to_edit_object_dict.keys()))[1:-1]).replace("\'", "")
        query = f"UPDATE msc.group SET {fields} WHERE id = {id};"
        self.cur.execute(query, tuple(to_edit_object_dict.values()))

    def get_groups_by_user_id(self, user_id: int):
        query = "SELECT msc.group.* FROM msc.user_has_group JOIN msc.group ON msc.user_has_group.group_id=msc.group.id WHERE user_id=%s;"
        self.cur.execute(query, (user_id,))
        return self.cur.fetchall()

    def join_group(self, token: str, user_id: int):
        query = "SELECT * FROM msc.group WHERE token = %s;"
        self.cur.execute(query, (token,))
        group = self.cur.fetchone()
        if group is None:
            raise HTTPException(
                status_code=404, detail="Group not found.")
        check_if_user_in_group_query = "SELECT * FROM msc.user_has_group WHERE user_id = %s AND group_id = %s;"
        self.cur.execute(check_if_user_in_group_query, (user_id, group["id"],))
        if self.cur.fetchone() is not None:
            raise HTTPException(
                status_code=400, detail="User is already in group.")
        join_query = "INSERT INTO msc.user_has_group (user_id, group_id) VALUES (%s, %s);"
        self.cur.execute(join_query, (user_id, group["id"],))
        return group

    def leave_group(self, user_id: int, group_id: int):
        check_if_user_is_owner_query = "SELECT * FROM msc.group WHERE id = %s AND owner_id = %s;"
        self.cur.execute(check_if_user_is_owner_query, (group_id, user_id,))
        if self.cur.fetchone() is not None:
            raise HTTPException(
                status_code=400, detail="User is the owner of the group.")
        query = "DELETE FROM msc.user_has_group WHERE user_id = %s AND group_id = %s;"
        self.cur.execute(query, (user_id, group_id,))

    def _model_to_fields_and_values_string_parameters(self, model: BaseModel):
        if not issubclass(type(model), BaseModel):
            raise ModelException(
                "Methods accepts only pydantic.BaseModel objects.")
        model_dict = model.dict()
        return ", ".join(model_dict.keys()), ", ".join(["%s"] * len(model_dict))

    def close(self):
        self.cnx.close()

    def commit(self):
        self.cnx.commit()

    def rollback(self):
        self.cnx.rollback()


class SessionContextManager:
    def __init__(self, status_code=500, detail="Internal server error."):
        self.db_context = GroupDatabaseManager()
        self.status_code = status_code
        self.detail = detail

    def __enter__(self):
        return self.db_context

    def __exit__(self, ex_type, ex_value, ex_traceback):
        if ex_type is None:
            self.db_context.commit()
        else:
            self.db_context.rollback()
            if os.getenv("ENVIRONMENT").lower() == "production":
                logging.error(
                    str(ex_value) + "\n" + "".join(traceback.format_tb(ex_traceback)))
                raise HTTPException(
                    status_code=self.status_code, detail=self.detail)
            else:
                raise ex_value
        self.db_context.close()
