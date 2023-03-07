import Button from "../../StandardComponents/Button";
import { useFetch } from "../../StandardComponents/Form/hooks";
import Switch, { useSwitch } from "../../StandardComponents/Switch";
import SwitchableContainer from "../../StandardComponents/SwitchableContainer";
import { useToastContext } from "../../StandardComponents/Toast/toastContext";
import { useSession } from "../sessionContext";
import Login from "./Login";
import Registration from "./Registration";

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

const UserLayout: React.FC = () => {
  const session = useSession();
  const { selected, handleSwitch } = useSwitch(options, "Registration");
  const { isLoading, sendRequest } = useFetch(useToastContext().addToast);
  return (
    <div className="h-full w-full flex flex-col gap-y-4 justify-center items-center text-secondary">
      {!session.session ? (
        <>
          <Switch
            options={options}
            selected={selected}
            handleSwitch={handleSwitch}
          />
          <SwitchableContainer
            components={components}
            currentlySelected={selected.label}
          />
        </>
      ) : (
        <div className="flex flex-col gap-y-2">
          <p className="text-neutral-800">You're now logged in!</p>
          <Button
            onClick={() => {
              sendRequest(
                "/v1/user/auth/logout",
                {
                  method: "POST",
                  headers: {
                    withCredentials: "true",
                  },
                },
                session.logout
              );
            }}
            isLoading={isLoading}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserLayout;
