import { useState } from "react";
import {
  GetInputValueType,
  InputObjectType,
  SetInputValueType,
  useInputs,
} from "../hooks";
import { ValidatorType } from "../validation";
import InputError from "./InputError";
import PasswordStrength from "./InputStrength";

export type InputBasePropsType = {
  inputObject: InputObjectType;
  formInputs: ReturnType<typeof useInputs>;
};

const useInput = (validator: ValidatorType) => {
  const [isBlurred, _setIsBlurred] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const shouldShowErrors = isBlurred && errors.length > 0;

  const setIsBlurred = () => {
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

export default function Input({ inputObject, formInputs }: InputBasePropsType) {
  const { setIsBlurred, errors, validateInput, shouldShowErrors } = useInput(
    inputObject.validator
  );

  return (
    <div className="flex flex-col gap-y-1">
      <input
        type={inputObject.type}
        onChange={(e) => {
          validateInput(e.target.value);
          formInputs.setInputValue(inputObject.name, e.target.value as string);
        }}
        onFocus={(e) => validateInput(e.target.value as string)}
        onBlur={setIsBlurred}
        name={inputObject.name}
        placeholder={inputObject.label}
        className={`w-full border-2 bg-secondary py-2.5 shadow-neo-1 rounded-xl px-4 outline-none ${
          shouldShowErrors ? "border-red-500" : "focus:border-violet-600"
        }`}
      />
      <div className="flex flex-col gap-y-1 px-2">
        {inputObject.rated ? (
          <PasswordStrength
            value={formInputs.getInputValue(inputObject.name)}
          />
        ) : null}
        <InputError errors={errors} shouldShowErrors={shouldShowErrors} />
      </div>
    </div>
  );
}
