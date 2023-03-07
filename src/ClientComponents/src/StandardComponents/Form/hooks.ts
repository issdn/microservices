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

const handleResponse = async (
  response: Response,
  addToast: ReturnType<typeof useToastContext>["addToast"],
  onSuccess: () => void
) => {
  const data = await response.json();
  if (response.ok) {
    addToast({
      title: data.title || "Success!",
      type: "success",
    });
    onSuccess();
  } else {
    let toastObject: ToastType = {
      title: data.title || "Oops!",
      type: "warning",
    };
    if (data.hasOwnProperty("errors")) {
      toastObject = {
        ...toastObject,
        message: Object.values((data as ErrorResponseType).errors)[0][0],
      };
    }
    addToast(toastObject);
  }
};

export const useFetch = (
  addToast: ReturnType<typeof useToastContext>["addToast"]
) => {
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async (
    url: string,
    init?: RequestInit,
    onSuccess?: () => void
  ) => {
    setIsLoading(true);
    try {
      fetch(url, init).then(async (response) => {
        await handleResponse(response, addToast, onSuccess || (() => {}));
      });
    } catch (err: any) {
      addToast({
        title: err.message || "Network error.",
        type: "warning",
      });
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    sendRequest,
  };
};
