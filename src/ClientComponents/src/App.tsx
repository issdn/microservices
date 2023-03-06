import Switch, { useSwitch } from "./StandardComponents/Switch";
import SwitchableContainer from "./StandardComponents/SwitchableContainer";
import ToastContainer from "./StandardComponents/Toast/ToastContainer";
import { ToastContext, useToast } from "./StandardComponents/Toast/hooks";
import Login from "./User/Components/Login";
import Registration from "./User/Components/Registration";

const options = {
  Registration: {
    label: "Registration",
    onClick: () => {
      console.log("Registration");
    },
  },
  Login: {
    label: "Login",
    onClick: () => {
      console.log("Login");
    },
  },
};

const components = {
  Registration: <Registration />,
  Login: <Login />,
};

function App() {
  const { toasts, addToast, deleteToast } = useToast();
  const { selected, handleSwitch } = useSwitch(options, "Registration");
  return (
    <ToastContext.Provider value={{ toasts, addToast, deleteToast }}>
      <div className="h-full w-full flex flex-col gap-y-4 justify-center items-center text-secondary">
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
      <ToastContainer toasts={toasts} deleteToast={deleteToast} />
    </ToastContext.Provider>
  );
}

export default App;
