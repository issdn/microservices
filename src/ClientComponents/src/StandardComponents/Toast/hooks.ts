import { useContext, useState } from "react";
import { ToastType } from "./ToastContainer";
import React from "react";

export type ToastColorType = "warning" | "success";

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

export const ToastContext = React.createContext<{
  toasts: ReturnType<typeof useToast>["toasts"];
  addToast: ReturnType<typeof useToast>["addToast"];
  deleteToast: ReturnType<typeof useToast>["deleteToast"];
}>({
  toasts: [],
  addToast: () => {},
  deleteToast: () => {},
});

export const useToastContext = () => useContext(ToastContext);
