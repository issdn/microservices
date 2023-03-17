import Layout from "../StandardComponents/Layout";
import { SecureComponent } from "../User/sessionContext";
import UserGroups from "./UserGroups";
import { useEffect, useState } from "react";
import { useToast } from "../StandardComponents/Toast/toastContext";
import { useFetch } from "../StandardComponents/fetch";
import { useSession } from "../User/sessionContext";
import { GroupType } from "./types";
import Spinner from "../StandardComponents/Spinner";

type GroupsLayoutProps = {};

const GroupsLayout: React.FC<GroupsLayoutProps> = () => {
  const session = useSession();
  const { addToast } = useToast();
  const [groups, setGroups] = useState<GroupType[]>([]);
  const responseHandler = {
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

  const { loading, sendRequest } = useFetch(responseHandler);
  useEffect(() => {
    sendRequest(`/group/v1/user/${session.id}`, {
      headers: { "Content-Type": "application/json" },
    });
  }, [session.id]);
  return (
    <SecureComponent>
      <Layout>{loading ? <Spinner /> : <UserGroups groups={groups} />}</Layout>
    </SecureComponent>
  );
};

export default GroupsLayout;
