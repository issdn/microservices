import { InputObjectType } from "./hooks";
import InputError from "./InputError";
import PasswordStrength from "./PasswordStrength";

export type InputBaseProps = {
  inputObject: InputObjectType;
  setTouched: () => void;
  errors: string[];
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  shouldShowErrors: boolean;
};

const Input: React.FC<InputBaseProps> = ({
  inputObject,
  setTouched,
  errors,
  onChange,
  inputValue,
  shouldShowErrors,
}) => {
  return (
    <div className="flex flex-col">
      <label className="px-2" htmlFor={inputObject.name}>
        {inputObject.label}
      </label>
      <input
        type={inputObject.type}
        onChange={onChange}
        onBlur={setTouched}
        name={inputObject.name}
        placeholder={inputObject.label}
        className={`w-full border-2 bg-secondary py-2.5 focus:border-violet-600 shadow-neo-1 rounded-xl px-4 outline-none ${
          shouldShowErrors ? "border-red-500" : ""
        }`}
      />
      <div className="flex flex-col gap-y-1 px-2 mt-1">
        {inputObject.rated ? <PasswordStrength value={inputValue} /> : null}
        <InputError errors={errors} shouldShowErrors={shouldShowErrors} />
      </div>
    </div>
  );
};

export default Input;
