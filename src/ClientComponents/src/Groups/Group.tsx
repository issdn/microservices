import { useMemo, useState } from "react";
import Tooltip from "./Tooltip";
import { GroupType } from "./types";
import IconButton from "../StandardComponents/IconButton";
import { useFetch } from "../StandardComponents/fetch";
import { useToastContext } from "../StandardComponents/Toast/toastContext";
import { useSession } from "../User/sessionContext";
import Modal, { useModal } from "../StandardComponents/Modal/Modal";
import Button from "../StandardComponents/Button";

type GroupProps = {
  group: GroupType;
  deleteGroup: (id: GroupType["id"]) => void;
};

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

const Group: React.FC<GroupProps> = ({ group, deleteGroup }) => {
  const deleteResponseHandlers = {
    200: () => {
      addToast({ title: "Deleted successfully!", type: "success" });
      deleteGroup(group.id);
    },
    400: () => {
      addToast({
        title: "Could not delete the group.",
        type: "error",
      });
    },
    401: () => {
      addToast({
        title: "You have to log in.",
        type: "error",
      });
    },
    403: () => {
      addToast({
        title: "You you're not an owner of this group.",
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

  const leaveResponseHandlers = {
    200: () => {
      addToast({ title: "Left successfully!", type: "success" });
      deleteGroup(group.id);
    },
    400: () => {
      addToast({
        title: "Could not leave the group.",
        type: "error",
      });
    },
    401: () => {
      addToast({
        title: "You have to log in.",
        type: "error",
      });
    },
    403: () => {
      addToast({
        title: "You are not authorized.",
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

  const session = useSession();
  const { addToast } = useToastContext();
  const { del, loading } = useFetch();
  const [visible, setVisible] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const { isOpen, open, close } = useModal();

  return (
    <>
      <div className="flex flex-col items-center gap-y-4">
        <div className="group-card relative w-full min-w-[48px] rounded-lg px-4">
          <img
            onClick={() => setShowPanel(!showPanel)}
            onKeyDown={() => setShowPanel(!showPanel)}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className={`transition-[border-radius] duration-100 ease-linear ${
              showPanel ? "rounded-2xl" : "rounded-3xl hover:rounded-2xl"
            } cursor-pointer`}
            src={
              group.avatar_url ||
              `https://api.dicebear.com/5.x/initials/svg?seed=${
                group.name
              }&backgroundColor=${useMemo(() => getRandomColor(), [])}&size=48`
            }
            alt={group.name + " group avatar"}
          ></img>
          <Tooltip styles="" visible={visible}>
            <p>{group.name}</p>
          </Tooltip>
        </div>

        {showPanel && (
          <div className="flex w-fit flex-col gap-y-2">
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
                attributes={{ disabled: loading }}
                type="accent"
                styles="text-red-600 rounded-2xl p-0.5"
                name="delete_forever"
                onClick={open}
              />
            ) : (
              <IconButton
                attributes={{ disabled: loading }}
                type="accent"
                styles="text-red-600 rounded-2xl p-0.5"
                name="close"
                onClick={open}
              />
            )}
          </div>
        )}
      </div>
      <Modal isOpen={isOpen} close={close}>
        {group.owner_id === session.id ? (
          <>
            <h1 className="text-xl font-semibold">
              Are you sure you want to delete the group?
            </h1>
            <div className="flex w-full flex-row gap-x-2">
              <Button onClick={close} type="primary" loading={loading}>
                No
              </Button>
              <Button
                onClick={async () => {
                  await del(`/group/v1/${group.id}`, deleteResponseHandlers);
                }}
                type="secondary"
                loading={loading}
              >
                Yes
              </Button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-xl font-semibold">
              Are you sure you want to leave the group?
            </h1>
            <div className="flex w-full flex-row gap-x-2">
              <Button onClick={close} type="primary" loading={loading}>
                No
              </Button>
              <Button
                onClick={async () => {
                  await del(
                    `/group/v1/leave/${group.id}`,
                    leaveResponseHandlers
                  );
                }}
                type="secondary"
                loading={loading}
              >
                Yes
              </Button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default Group;
