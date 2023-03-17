import { useState } from "react";
import Tooltip from "./Tooltip";
import { GroupType } from "./types";
import IconButton from "../StandardComponents/IconButton";

type GroupCardProps = {
  group: GroupType;
  color: string;
};

const GroupCard: React.FC<GroupCardProps> = ({ group, color }) => {
  const [visible, setVisible] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div className="flex flex-col gap-y-4 p-4 items-center">
      <div className="relative group-card rounded-lg ">
        <img
          onClick={() => setShowPanel(!showPanel)}
          onKeyDown={() => setShowPanel(!showPanel)}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          className={`transition-[border-radius] ease-linear duration-100 ${
            showPanel ? "rounded-2xl" : "rounded-3xl hover:rounded-2xl"
          } cursor-pointer`}
          src={
            group.avatar_url ||
            `https://api.dicebear.com/5.x/initials/svg?seed=${group.name}&backgroundColor=${color}&size=48`
          }
          alt={group.name + " group avatar"}
        ></img>
        <Tooltip styles="" visible={visible}>
          <p>{group.name}</p>
        </Tooltip>
      </div>
      {showPanel && (
        <div className="flex flex-col w-fit gap-y-2">
          <IconButton
            type="accent"
            styles="text-red-500 rounded-2xl p-0.5"
            name="close"
          />
          <IconButton
            type="accent"
            styles="text-neutral-300 rounded-2xl p-0.5"
            name="link"
          />
        </div>
      )}
    </div>
  );
};

export default GroupCard;
