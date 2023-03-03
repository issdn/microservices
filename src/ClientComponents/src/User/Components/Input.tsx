import { useState } from "react";
import {
  GetInputValueType,
  InputObjectInterface,
  SetInputValueType,
} from "../hooks";
import { ValidatorType } from "../validation";
import InputError from "./InputError";
import { getPasswordStrength } from "../functions";

export type InputBasePropsType = {
  inputObject: InputObjectInterface;
  setInputValue: SetInputValueType;
  getInputValue: GetInputValueType;
};

const useInput = (validator: ValidatorType) => {
  const [isBlurred, _setIsBlurred] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const shouldShowErrors = isBlurred && errors.length > 0;

  const setIsBlurred = (e: React.ChangeEvent<HTMLInputElement>) => {
    _setIsBlurred(true);
  };

  const validateInput = (value: string) => setErrors(validator.validate(value));

  return {
    setIsBlurred,
    errors,
    validateInput,
    shouldShowErrors,
  };
};

const PasswordStrength = ({
  value,
  inputType,
}: {
  value: string;
  inputType: InputObjectInterface["type"];
}) => {
  if (inputType !== "password") return null;
  const passwordStrength = getPasswordStrength(value);
  return (
    <div className="flex flex-row justify-between w-full">
      <p className="text-[.85rem] whitespace-nowrap">Password strength:</p>
      <div className="flex flex-row gap-x-2 items-center">
        <div
          className={`w-12 h-1.5 ${
            passwordStrength > 0 ? "bg-sky-300" : "bg-gray-300"
          } rounded-full`}
        ></div>
        <div
          className={`w-12 h-1.5 ${
            passwordStrength > 1 ? "bg-sky-400" : "bg-gray-300"
          } rounded-full`}
        ></div>
        <div
          className={`w-12 h-1.5 ${
            passwordStrength > 2 ? "bg-sky-500" : "bg-gray-300"
          } rounded-full`}
        ></div>
        <div
          className={`w-12 h-1.5 ${
            passwordStrength > 3 ? "bg-sky-600" : "bg-gray-300"
          } rounded-full`}
        ></div>
      </div>
    </div>
  );
};

export default function Input({
  inputObject,
  setInputValue,
  getInputValue,
}: InputBasePropsType) {
  const { name, label, validator, type } = inputObject;

  const { setIsBlurred, errors, validateInput, shouldShowErrors } =
    useInput(validator);

  return (
    <div className="flex flex-col gap-y-1">
      <input
        type={type}
        onChange={(e) => {
          validateInput(e.target.value);
          setInputValue(name, e.target.value as string);
        }}
        onFocus={(e) => validateInput(e.target.value as string)}
        onBlur={setIsBlurred}
        name={name}
        placeholder={label}
        className={`w-full border-2 bg-secondary py-2.5 shadow-neo-1 rounded-xl px-4 outline-none ${
          shouldShowErrors ? "border-red-500" : "focus:border-majorelle"
        }`}
      />
      <div className="flex flex-col gap-y-1 px-2">
        <PasswordStrength inputType={type} value={getInputValue(name)} />
        <InputError errors={errors} shouldShowErrors={shouldShowErrors} />
      </div>
    </div>
  );
}
