import { useState } from "react";
import { ValidatorType } from "./validation";

export interface InputObjectInterface {
  name: string;
  label: string;
  type: "text" | "password";
  validator: ValidatorType;
}

export type InputsObjectsType = Array<InputObjectInterface>;

export const useInputs = (inputsObjects: InputsObjectsType) => {
  const [inputsValues, setInputsValues] = useState(
    Object.fromEntries(
      Object.values(inputsObjects).map((inputObject) => [inputObject.name, ""])
    )
  );

  const setInputValue = (name: string, value: string) => {
    setInputsValues({ ...inputsValues, [name]: value });
  };

  const getInputValue = (name: keyof typeof inputsValues) => inputsValues[name];

  return {
    getInputValue,
    setInputValue,
  };
};

export type SetInputValueType = ReturnType<typeof useInputs>["setInputValue"];
export type GetInputValueType = ReturnType<typeof useInputs>["getInputValue"];
