import { useContext } from "react";
import React from "react";
import { useToast } from "./hooks";

type ToastProviderProps = {
  children: React.ReactNode;
  addToast: ReturnType<typeof useToast>["addToast"];
};

export const ToastContext = React.createContext<{
  addToast: ReturnType<typeof useToast>["addToast"];
}>({
  addToast: () => {},
});

export const useToastContext = () => useContext(ToastContext);

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  addToast,
}) => {
  return (
    <ToastContext.Provider value={{ addToast: addToast }}>
      {children}
    </ToastContext.Provider>
  );
};
export { useToast };
