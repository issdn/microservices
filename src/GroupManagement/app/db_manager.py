from pydantic import BaseModel
import mysql.connector
import os


class ModelException(Exception):
    pass


class GroupManager:
    # This class definitely doesn't have single responsibility but I'm gonna leave it like this for now.
    # ORM is definitely much easier to work with.

    def __init__(self):
        self.cnx = mysql.connector.connect(user=os.getenv("DB_USER"),
                                           password=os.getenv("DB_PASSWORD"),
                                           host=os.getenv("DB_HOST"),
                                           database=os.getenv("DB_NAME"))
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

    def delete_group(self, group_id: int):
        query = "DELETE FROM msc.group WHERE id = %s;"
        self.cur.execute(query, (group_id,))

    def update_group(self, id: int, to_edit_object: BaseModel):
        to_edit_object_dict = to_edit_object.dict()
        fields = (str(tuple("=".join([item, "%s"])
                  for item in to_edit_object_dict.keys()))[1:-1]).replace("\'", "")
        query = f"UPDATE msc.group SET {fields} WHERE id = {id};"
        self.cur.execute(query, tuple(to_edit_object_dict.values()))

    def get_groups_by_user_id(self, user_id: int):
        query = f"SELECT * FROM msc.user_has_group WHERE user_id = {user_id};"
        self.cur.execute(query)
        return self.cur.fetchall()

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
    def __init__(self):
        self.db_context = GroupManager()

    def __enter__(self):
        return self.db_context

    def __exit__(self, type, value, traceback):
        if type is None:
            self.db_context.commit()
        else:
            self.db_context.rollback()
        self.db_context.close()
