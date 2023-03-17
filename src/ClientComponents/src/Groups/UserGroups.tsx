import GroupCard from "./GroupCard";
import { GroupType } from "./types";

const colors = [
  "eff41e",
  "1fcf6c",
  "ff8339",
  "7187ff",
  "fe98ca",
  "ff5b5f",
  "9cceff",
  "d74cbf",
];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

type UserGroupsProps = { groups: GroupType[] };

const UserGroups: React.FC<UserGroupsProps> = ({ groups }) => {
  return (
    <div className="flex flex-col gap-y-2 bg-neutral-900 rounded-2xl">
      {groups.map((group) => (
        <GroupCard color={getRandomColor()} group={group} key={group.id} />
      ))}
    </div>
  );
};

export default UserGroups;
