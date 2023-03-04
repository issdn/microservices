import { useState } from "react";
import { ValidatorType } from "./validation";

export type InputObjectType = {
  name: string;
  label: string;
  type: "text" | "password";
  validator: ValidatorType;
  rated?: boolean;
};

export type InputsObjectsType = InputObjectType[];

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
    inputsValues,
    getInputValue,
    setInputValue,
  };
};

export type SetInputValueType = ReturnType<typeof useInputs>["setInputValue"];
export type GetInputValueType = ReturnType<typeof useInputs>["getInputValue"];

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = async (url: string, init?: RequestInit) => {
    try {
      setIsLoading(true);
      setError(null);
      const responseData = await fetch(url, init);
      switch (responseData.status) {
        case 200:
          return responseData;
        case 400:
          setError(responseData.statusText || "Bad request");
        case 401:
          setError(responseData.statusText || "Unauthorized");
        case 404:
          setError(responseData.statusText || "Not found");
        case 500:
          setError(responseData.statusText || "Internal server error");
        default:
          setError(
            responseData.statusText ||
              "Something went wrong, please try again later."
          );
      }
    } catch (err) {
      setError(err.message || "Something went wrong, please try again later.");
    }
    setIsLoading(false);
  };
  console.log(error);
  return {
    isLoading,
    error,
    sendRequest,
  };
};
