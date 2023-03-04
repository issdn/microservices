import { InputsObjectsType, useInputs, useFetch } from "../hooks";
import { validator } from "../validation";
import { Button } from "./Button";
import InputStack from "./InputStack";

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
  const { isLoading, error, sendRequest } = useFetch();
  const formInputs = useInputs(inputsObject);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendRequest("http://localhost:5113/v1/user/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInputs.inputsValues),
    });
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-secondary px-2 w-full md:px-0 md:w-1/4 flex flex-col justify-center items-center gap-y-10 p-8 drop-shadow-md font-mono"
    >
      <h1 className="text-2xl">Register</h1>
      <div className="flex flex-col gap-y-4 md:px-8 w-full">
        <InputStack formInputs={formInputs} inputsObject={inputsObject} />
        <Button attributes={{ disabled: isLoading }}>Register</Button>
      </div>
    </form>
  );
}
