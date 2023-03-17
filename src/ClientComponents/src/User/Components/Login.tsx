import {
  InputsObjectsType,
  useInputs,
} from "../../StandardComponents/Form/hooks";
import { validator } from "../../StandardComponents/Form/validation";
import Form from "../../StandardComponents/Form/Form";
import { useSession } from "../sessionContext";
import { useFetch } from "../../StandardComponents/fetch";
import { useToastContext } from "../../StandardComponents/Toast/toastContext";

const inputsObject: InputsObjectsType = [
  {
    name: "username",
    label: "Username",
    type: "text",
    validator: validator()
      .required("Username is requried.")
      .min(8, "Username must be at least 8 characters long.")
      .max(32, "Username must be at most 32 characters long."),
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    validator: validator()
      .required("Password is requried.")
      .min(8, "Password must be at least 8 characters long.")
      .max(64, "Password must be at most 64 characters long."),
  },
];

const Login = () => {
  const session = useSession();
  const { addToast } = useToastContext();

  const responseHandlers = {
    200: () => {
      addToast({ title: "Login successful.", type: "success" });
      session.login();
    },
    400: () =>
      addToast({ title: "Invalid password or username.", type: "error" }),
    default: () =>
      addToast({
        title: "Login failed because of an unknown error.",
        type: "error",
      }),
  };

  const { loading, post } = useFetch();
  const formInputs = useInputs(inputsObject);

  const onSubmit = async () => {
    await post(
      "/user/v1/auth/login",
      responseHandlers,
      formInputs.inputsValues
    );
  };

  return (
    <Form
      inputsObject={inputsObject}
      isLoading={loading}
      onSubmit={onSubmit}
      heading="Login"
      buttonText="Login"
      formInputs={formInputs}
    />
  );
};

export default Login;
