import Form from "../../StandardComponents/Form/Form";
import {
  InputsObjectsType,
  useInputs,
} from "../../StandardComponents/Form/hooks";
import { validator } from "../../StandardComponents/Form/validation";
import { useToast } from "../../StandardComponents/Toast/toastContext";
import { useFetch } from "../../StandardComponents/fetch";

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
    rated: true,
    validator: validator()
      .required("Password is requried.")
      .min(8, "Password must be at least 8 characters long.")
      .max(64, "Password must be at most 64 characters long."),
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    validator: validator().required("Email is requried.").email(),
  },
];

const Registration: React.FC = () => {
  const formInputs = useInputs(inputsObject);

  const { addToast } = useToast();

  const responseHandler = {
    201: () => {
      addToast({ title: "Registered successfully", type: "success" });
      formInputs.clearInputs();
    },
    400: () => addToast({ title: "Couldn't register.", type: "error" }),
    default: () =>
      addToast({
        title: "Login failed because of an unknown error.",
        type: "error",
      }),
  };

  const { loading, sendRequest } = useFetch(responseHandler);

  const onSubmit = async () => {
    await sendRequest("user/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInputs.inputsValues),
    });
  };

  return (
    <Form
      inputsObject={inputsObject}
      isLoading={loading}
      onSubmit={onSubmit}
      heading="Registration"
      buttonText="Register"
      formInputs={formInputs}
    />
  );
};

export default Registration;
