import Toast from "./Toast";
import { ToastColorType } from "./hooks";

export type ToastType = {
  title: string;
  message?: string;
  id?: string;
  type: ToastColorType;
  timeout?: number;
};

export default function ToastContainer({
  toasts,
  deleteToast,
}: {
  toasts: ToastType[];
  deleteToast: any;
}) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none">
      <div className="w-full h-full flex flex-col gap-y-2 justify-end items-center py-8">
        {toasts.map((t) => (
          <Toast key={t.id} info={t} deleteToast={deleteToast} />
        ))}
      </div>
    </div>
  );
}
