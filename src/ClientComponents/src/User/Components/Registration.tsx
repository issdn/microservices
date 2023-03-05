import {
  InputsObjectsType,
  useInputs,
  useFetch,
} from "../../StandardComponents/Form/hooks";
import { validator } from "../../StandardComponents/Form/validation";
import Form from "../../StandardComponents/Form/Form";

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

export default function Registration() {
  const { isLoading, sendRequest } = useFetch();
  const formInputs = useInputs(inputsObject);

  const onSubmit = async () => {
    await sendRequest("http://localhost:5113/v1/user/auth/register", {
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
      isLoading={isLoading}
      onSubmit={onSubmit}
    />
  );
}
