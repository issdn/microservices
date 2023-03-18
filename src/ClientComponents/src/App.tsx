import GroupsLayout from "./Groups/GroupsLayout";
import Switch, { useSwitch } from "./StandardComponents/Switch";
import SwitchableContainer from "./StandardComponents/SwitchableContainer";
import ToastContainer from "./StandardComponents/Toast/ToastContainer";
import { useToast } from "./StandardComponents/Toast/hooks";
import { ToastProvider } from "./StandardComponents/Toast/toastContext";
import UserLayout from "./User/Components/UserLayout";
import { SessionProvider } from "./User/sessionContext";

const App = () => {
  const { toasts, deleteToast, addToast } = useToast();
  const options = {
    User: {
      label: "User",
    },
    Groups: {
      label: "Groups",
    },
  };

  const components = {
    User: <UserLayout />,
    Groups: <GroupsLayout />,
  };

  const { selected, handleSwitch } = useSwitch(options, "User");
  return (
    <ToastProvider addToast={addToast}>
      <SessionProvider>
        <div className="flex flex-col h-full gap-y-16 pt-32 items-center justify-start">
          <Switch
            options={options}
            selected={selected}
            handleSwitch={handleSwitch}
          />
          <SwitchableContainer
            components={components}
            currentlySelected={selected.label}
          />
        </div>
      </SessionProvider>
      <ToastContainer toasts={toasts} deleteToast={deleteToast} />
    </ToastProvider>
  );
};

export default App;
