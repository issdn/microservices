import { useState } from "react";
import IconButton from "../IconButton";

export const useModal = () => {
  const [isOpen, setOpen] = useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  return {
    isOpen,
    open,
    close,
  };
};

type ModalProps = {
  children: React.ReactNode;
  isOpen: ReturnType<typeof useModal>["isOpen"];
  close: ReturnType<typeof useModal>["close"];
};

const Modal: React.FC<ModalProps> = ({ children, isOpen, close }) => {
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) close();
  };

  if (isOpen) {
    return (
      <div
        onClick={handleModalClick}
        className="fixed top-0 left-0 z-50 flex h-screen w-screen flex-row items-center justify-center bg-black/40"
      >
        <div className="mx-4 flex min-h-[15%] w-full animate-scaleY flex-col gap-y-4 rounded-2xl bg-secondary p-4 sm:w-fit md:mx-0 md:min-w-[16rem]">
          <div className="flex w-full flex-row justify-end">
            <IconButton
              onClick={close}
              styles="rounded-md text-3xl"
              name="close"
              type="light"
            />
          </div>
          {children}
        </div>
      </div>
    );
  } else return null;
};

export default Modal;
