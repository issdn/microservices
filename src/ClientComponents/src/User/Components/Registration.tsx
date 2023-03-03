import { InputsObjectsType, useInputs } from "../hooks";
import { validator } from "../validation";
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
  return (
    <form className="bg-secondary w-1/4 flex flex-col justify-center items-center gap-y-10 p-8 drop-shadow-md font-mono">
      <h1 className="text-2xl">Register</h1>
      <div className="flex flex-col gap-y-4 w-full">
        <InputStack inputsObject={inputsObject} />
        <button className="group w-full overflow-hidden relative py-2 rounded-xl flex flex-row justify-center bg-majorelle text-secondary text-xl drop-shadow-lg">
          Register
        </button>
      </div>
    </form>
  );
}
