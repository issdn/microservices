import Button from "../../StandardComponents/Button";
import Layout from "../../StandardComponents/Layout";
import Switch, { useSwitch } from "../../StandardComponents/Switch";
import SwitchableContainer from "../../StandardComponents/SwitchableContainer";
import {
  useToast,
  useToastContext,
} from "../../StandardComponents/Toast/toastContext";
import { useFetch } from "../../StandardComponents/fetch";
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
  const { addToast } = useToast();
  const responseHandler = {
    200: () => {
      addToast({ title: "Logged out successfully", type: "success" });
      session.logout();
    },
    400: () => addToast({ title: "Couldn't log out.", type: "error" }),
    default: () =>
      addToast({
        title: "Login failed because of an unknown error.",
        type: "error",
      }),
  };

  const { selected, handleSwitch } = useSwitch(options, "Registration");
  const { loading, sendRequest } = useFetch(responseHandler);
  return (
    <Layout>
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
              sendRequest("/user/v1/auth/logout", {
                method: "POST",
                headers: {
                  withCredentials: "true",
                },
              });
            }}
            loading={loading}
          >
            Logout
          </Button>
        </div>
      )}
    </Layout>
  );
};

export default UserLayout;
