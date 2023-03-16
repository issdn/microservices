import { useEffect } from "react";
import { ToastType } from "./ToastContainer";
import IconButton from "../IconButton";
import { useTimeout } from "../hooks";
import Icon from "../Icon";

const toastStyleTypes = {
  success: {
    icon: "done",
    color: "text-green-600",
    border: "border-green-600",
  },
  error: { icon: "close", color: "text-rose-600", border: "border-rose-600" },
};

type ToastProps = {
  info: ToastType;
  deleteToast: any;
};

const Toast: React.FC<ToastProps> = ({ info, deleteToast }) => {
  const [timeout] = useTimeout(() => {
    deleteToast(info.id);
  }, info.timeout as number);

  useEffect(() => timeout(), []);

  return (
    <div
      className={`bg-white drop-shadow-2xl border text-neutral-800 border-gray-100 gap-x-4 w-full md:w-[30rem] py-[0.8rem] pr-4 pl-6 flex flex-row rounded-xl justify-center items-center pointer-events-auto`}
    >
      <div
        className={`border-2 ${
          toastStyleTypes[info.type].border
        } p-0.5 rounded-full flex flex-col items-center justify-center`}
      >
        <Icon
          styles={`${toastStyleTypes[info.type].color}`}
          name={toastStyleTypes[info.type].icon}
        />
      </div>

      <div
        className={`w-full flex flex-col ${
          info.message ? "gap-y-2" : ""
        } justify-center h-full`}
      >
        <p className="text-lg align-middle font-semibold">{info.title}</p>
        <p key={info.id} className="align-middle text-base">
          {info.message}
        </p>
      </div>
      <div className="h-full flex flex-col justify-center">
        <div
          className={` cursor-pointer leading-3 px-1 rounded-xl text-3xl text-neutral-300`}
        >
          <IconButton
            name="close"
            type="clear"
            styles="text-3xl"
            onClick={() => {
              deleteToast(info.id);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Toast;
