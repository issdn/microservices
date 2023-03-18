import { useState } from "react";
import Tooltip from "./Tooltip";
import { GroupType } from "./types";
import IconButton from "../StandardComponents/IconButton";
import { useFetch } from "../StandardComponents/fetch";
import { useToastContext } from "../StandardComponents/Toast/toastContext";
import { useSession } from "../User/sessionContext";

type GroupCardProps = {
  group: GroupType;
  color: string;
};

const GroupCard: React.FC<GroupCardProps> = ({ group, color }) => {
  const session = useSession();
  const [visible, setVisible] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const { addToast } = useToastContext();
  const responseHandlers = {
    200: () => {
      addToast({ title: "Deleted successfully!", type: "success" });
    },
    400: () => {
      addToast({
        title: "Could not delete the group.",
        type: "error",
      });
    },
    401: () => {
      addToast({
        title: "You are not authorized to delete this group.",
        type: "error",
      });
    },
    500: () => {
      addToast({
        title: "Could not delete the group.",
        type: "error",
      });
    },
    default: () => {
      addToast({
        title: "Something went wrong.",
        type: "error",
      });
    },
  };

  const { del } = useFetch();

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
            styles="text-neutral-300 rounded-2xl p-0.5"
            name="link"
            onClick={() => {
              navigator.clipboard.writeText(group.token).then(() => {
                addToast({ title: "Copied to clipboard!", type: "success" });
              });
            }}
          />
          {group.owner_id === session.id ? (
            <IconButton
              type="accent"
              styles="text-red-600 rounded-2xl p-0.5"
              name="delete_forever"
              onClick={async () => {
                await del(`/groups/v1/${group.id}`, responseHandlers);
              }}
            />
          ) : (
            <IconButton
              type="accent"
              styles="text-red-600 rounded-2xl p-0.5"
              name="close"
              onClick={async () => {
                await del(`/groups/v1/leave/${group.id}`, responseHandlers);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default GroupCard;
