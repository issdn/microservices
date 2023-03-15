from app.db_manager import SessionContextManager, GroupManager
import pytest
from app.models.group import Group

from dotenv import load_dotenv
load_dotenv()


class SessionContextManagerTest(SessionContextManager):
    def __exit__(self, type, value, traceback):
        self.db_context.rollback()
        self.db_context.close()


def test_insert_group():
    with SessionContextManagerTest() as session:
        group = Group(name="test_group",
                      token="testtesttesttesttesttesttesttest")
        group_id = session.add_group(38, group)
        assert group_id > 0


def test_get_group():
    with SessionContextManagerTest() as session:
        group = Group(name="test_group",
                      token="testtesttesttesttesttesttesttest")
        group_id = session.add_group(38, group)
        assert group_id > 0
        group = session.get_group(group_id)
        assert group is not None
        assert group["name"] == "test_group"


def test_get_groups():
    with SessionContextManagerTest() as session:
        group = Group(name="test_group",
                      token="testtesttesttesttesttesttesttest")
        group_id = session.add_group(38, group)
        assert group_id > 0
        groups = session.get_all_groups()
        assert groups is not None
        assert len(groups) > 0


def test_update_group():
    with SessionContextManagerTest() as session:
        group = Group(name="test_group",
                      token="testtesttesttesttesttesttesttest")
        group_id = session.add_group(38, group)
        assert group_id > 0
        group = Group(name="test_group_2",
                      token="testtesttesttest1111111111111111")
        session.update_group(group_id, group)
        group = session.get_group(group_id)
        assert group is not None
        assert group["name"] == "test_group_2"


def test_delete_group():
    with SessionContextManagerTest() as session:
        group = Group(name="test_group",
                      token="testtesttesttesttesttesttesttest")
        group_id = session.add_group(38, group)
        session.delete_group(group_id)
        group = session.get_group(group_id)
        assert group is None


def get_groups_by_user_id():
    with SessionContextManagerTest() as session:
        group = Group(name="test_group",
                      token="testtesttesttesttesttesttesttest")
        session.add_group(38, group)
        groups = session.get_groups_by_user_id(38)
        assert groups is not None
        assert len(groups) > 0


if __name__ == "__main__":
    pytest.main()
