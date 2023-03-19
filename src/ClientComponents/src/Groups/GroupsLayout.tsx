import { SecureComponent } from "../User/sessionContext";
import Groups from "./Groups";
import { useEffect, useState } from "react";
import { useFetch } from "../StandardComponents/fetch";
import { useSession } from "../User/sessionContext";
import { GroupType } from "./types";
import Spinner from "../StandardComponents/Spinner";
import { useToastContext } from "../StandardComponents/Toast/toastContext";

type GroupsLayoutProps = {};

const GroupsLayout: React.FC<GroupsLayoutProps> = () => {
  const session = useSession();
  const { addToast } = useToastContext();
  const [groups, setGroups] = useState<GroupType[]>([]);
  const responseHandlers = {
    200: (response: []) => {
      setGroups(response);
    },
    400: () => addToast({ title: "You're not authenticated.", type: "error" }),
    default: () =>
      addToast({ title: "Couldn't get your groups.", type: "error" }),
  };

  const addGroup = (group: GroupType) => {
    setGroups([...groups, group]);
  };

  const deleteGroup = (id: GroupType["id"]) => {
    setGroups(groups.filter((group) => group.id !== id));
  };

  const { canRender, get } = useFetch();
  useEffect(() => {
    get(`/group/v1/user/${session.id}`, responseHandlers);
  }, [session.canRender]);
  return (
    <SecureComponent>
      {!canRender ? (
        <Spinner />
      ) : (
        <Groups deleteGroup={deleteGroup} addGroup={addGroup} groups={groups} />
      )}
    </SecureComponent>
  );
};

export default GroupsLayout;
