import Layout from "../StandardComponents/Layout";
import { SecureComponent } from "../User/sessionContext";
import GroupManagement from "./GroupManagement";

type GroupsLayoutProps = {};

const GroupsLayout: React.FC<GroupsLayoutProps> = () => {
  return (
    <SecureComponent>
      <Layout>
        <GroupManagement />
      </Layout>
    </SecureComponent>
  );
};

export default GroupsLayout;
