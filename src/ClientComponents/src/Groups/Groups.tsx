import { useMemo } from "react";
import IconButton from "../StandardComponents/IconButton";
import Modal, { useModal } from "../StandardComponents/Modal/Modal";
import CreateGroup from "./CreateGroup";
import Group from "./Group";
import JoinGroup from "./JoinGroup";
import { GroupType } from "./types";

type GroupsProps = {
  groups: GroupType[];
  addGroup: (group: GroupType) => void;
  deleteGroup: (id: GroupType["id"]) => void;
};

const Groups: React.FC<GroupsProps> = ({ groups, addGroup, deleteGroup }) => {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <div className="flex h-full flex-col gap-y-4 overflow-x-hidden overflow-y-scroll rounded-2xl bg-neutral-900 py-4 scrollbar-none">
        <div className="flex flex-row justify-center px-4">
          <IconButton
            onClick={open}
            type="accent"
            name="add"
            styles="transition-500 transition-[border-radius] text-green-500 text-3xl flex flex-row justify-center items-center w-[48px] h-[48px] rounded-3xl hover:bg-green-500 hover:text-secondary hover:rounded-2xl"
          />
        </div>
        {groups.map((group) => (
          <Group deleteGroup={deleteGroup} group={group} key={group.id} />
        ))}
      </div>
      <Modal isOpen={isOpen} close={close}>
        <div className="flex flex-col gap-y-8">
          <CreateGroup addGroup={addGroup} close={close} />
          <hr className="border-t border-neutral-900" />
          <JoinGroup addGroup={addGroup} close={close} />
        </div>
      </Modal>
    </>
  );
};

export default Groups;
