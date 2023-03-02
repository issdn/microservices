import { useState } from "react";
import { validator } from "../validation";
import Input from "./Input";

export default function Registration() {
  const [inputsValues, setInputsValues] = useState({
    username: "",
    password: "",
    email: "",
  });

  const inputs = {
    username: {
      name: "Username",
      validator: validator(inputsValues.username)
        .required("Username is requried.")
        .min(8, "Username must be at least 8 characters long.")
        .max(32, "Username must be at most 32 characters long."),
    },
    password: {
      name: "Password",
      validator: validator(inputsValues.password)
        .required("Password is requried.")
        .min(8, "Password must be at least 8 characters long.")
        .max(64, "Password must be at most 64 characters long."),
    },
    email: {
      name: "Email",
      validator: validator(inputsValues.email)
        .required("Email is requried.")
        .email(),
    },
  };

  const renderInputs = () => {
    return Object.values(inputs).map((row) => (
      <Input
        key={row.name}
        name={row.name}
        placeholder={row.name}
        setValue={(value: string) => {
          setInputsValues({ ...inputsValues, [row.name]: value });
        }}
        errors={row.validator.errors}
      />
    ));
  };

  return (
    <form className="bg-secondary w-1/4 flex flex-col justify-center items-center gap-y-10 p-8 drop-shadow-md font-mono">
      <h1 className="text-2xl">Register</h1>
      <div className="flex flex-col gap-y-4 w-full">
        {renderInputs()}
        <button className="group w-full overflow-hidden relative py-2 rounded-xl flex flex-row justify-center bg-majorelle text-secondary text-xl drop-shadow-lg">
          Register
        </button>
      </div>
    </form>
  );
}
