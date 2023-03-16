import GroupsLayout from "./Groups/GroupsLayout";
import ToastContainer from "./StandardComponents/Toast/ToastContainer";
import {
  ToastProvider,
  useToast,
} from "./StandardComponents/Toast/toastContext";
import UserLayout from "./User/Components/UserLayout";
import { SessionProvider } from "./User/sessionContext";

const App = () => {
  const { toasts, deleteToast, addToast } = useToast();
  return (
    <ToastProvider addToast={addToast}>
      <SessionProvider>
        <div className="flex flex-col h-full items-center justify-center">
          <GroupsLayout />
          <UserLayout />
        </div>
      </SessionProvider>
      <ToastContainer toasts={toasts} deleteToast={deleteToast} />
    </ToastProvider>
  );
};

export default App;
