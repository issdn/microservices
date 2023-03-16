import { useState } from "react";
import { ValidatorType } from "./validation";
import { ToastType } from "../Toast/ToastContainer";
import { useToastContext } from "../Toast/toastContext";

export type InputObjectType = {
  name: string;
  label: string;
  type: "text" | "password";
  validator: ValidatorType;
  rated?: boolean;
};

export type InputsObjectsType = InputObjectType[];

type ErrorResponseType = {
  title: string;
  status: number;
  errors: {
    [key: string]: string[];
  };
};

export const useInputs = (inputsObjects: InputsObjectsType) => {
  const [inputsValues, setInputsValues] = useState(
    Object.fromEntries(
      Object.values(inputsObjects).map((inputObject) => [inputObject.name, ""])
    )
  );

  const [_errors, _setErrors] = useState<{ [key: string]: string[] }>(
    Object.fromEntries(
      Object.values(inputsObjects).map((inputObject) => [
        inputObject.name,
        inputObject.validator.validate(""),
      ])
    )
  );

  const [touched, _setTouched] = useState(
    Object.fromEntries(
      Object.values(inputsObjects).map((inputObject) => [
        inputObject.name,
        false,
      ])
    )
  );

  const setInputValue = (name: string, value: string) => {
    setInputsValues({ ...inputsValues, [name]: value });
  };

  const setTouched = (name: string) => {
    _setTouched({ ...touched, [name]: true });
  };

  const setErrors = (name: string, errors: string[]) => {
    _setErrors({ ..._errors, [name]: errors });
  };

  const setAllTouched = () => {
    _setTouched(
      Object.fromEntries(
        Object.values(inputsObjects).map((inputObject) => [
          inputObject.name,
          true,
        ])
      )
    );
  };

  const getInputValue = (name: keyof typeof inputsValues) => inputsValues[name];

  return {
    errors: _errors,
    setErrors,
    touched,
    setTouched,
    inputsValues,
    getInputValue,
    setInputValue,
    setAllTouched,
  };
};
