import Layout from "../StandardComponents/Layout";
import { SecureComponent } from "../User/sessionContext";
import UserGroups from "./UserGroups";
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
      addToast({ title: "Login successful.", type: "success" });
      setGroups(response);
    },
    400: () =>
      addToast({ title: "Invalid password or username.", type: "error" }),
    default: () =>
      addToast({
        title: "Login failed because of an unknown error.",
        type: "error",
      }),
  };

  const { loading, get } = useFetch();
  useEffect(() => {
    get(`/group/v1/user/${session.id}`, responseHandlers);
  }, [session.id]);
  return (
    <SecureComponent>
      <Layout>{loading ? <Spinner /> : <UserGroups groups={groups} />}</Layout>
    </SecureComponent>
  );
};

export default GroupsLayout;
