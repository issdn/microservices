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
        <UserLayout />
      </SessionProvider>
      <ToastContainer toasts={toasts} deleteToast={deleteToast} />
    </ToastProvider>
  );
};

export default App;
