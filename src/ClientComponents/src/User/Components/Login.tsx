import {
  InputsObjectsType,
  useInputs,
  useFetch,
} from "../../StandardComponents/Form/hooks";
import { validator } from "../../StandardComponents/Form/validation";
import Form from "../../StandardComponents/Form/Form";
import { useToastContext } from "../../StandardComponents/Toast/toastContext";
import { useSession } from "../sessionContext";

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
  const { isLoading, sendRequest } = useFetch(useToastContext().addToast);
  const formInputs = useInputs(inputsObject);

  const onSubmit = async () => {
    sendRequest(
      "/v1/user/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInputs.inputsValues),
      },
      session.login
    );
  };

  return (
    <Form
      inputsObject={inputsObject}
      isLoading={isLoading}
      onSubmit={onSubmit}
      heading="Login"
      buttonText="Login"
      formInputs={formInputs}
    />
  );
};

export default Login;
