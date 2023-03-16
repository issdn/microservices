import { useState } from "react";
import { ToastType } from "./ToastContainer";

export type ToastColorType = "error" | "success";

const randomToken = () => {
  return Math.random().toString(12);
};

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const deleteToast = (id: string) => {
    setToasts(toasts.filter((t) => t.id !== id));
  };

  const addToast = ({
    title,
    message,
    type = "success",
    timeout = 3000,
  }: ToastType) => {
    setToasts([
      ...toasts,
      {
        title: title,
        message: message,
        type: type,
        timeout: timeout,
        id: randomToken(),
      },
    ]);
  };

  return { toasts, addToast, deleteToast };
};
