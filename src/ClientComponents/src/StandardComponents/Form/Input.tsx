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
  type?: InputTypes;
};

export type InputTypes = keyof typeof types;

const types = {
  neo: {
    default: "shadow-neo-1 outline-none",
    border: "focus:border-violet-600",
  },
  primary: {
    default: "outline-none",
    border: "focus:border-blue-600 border-neutral-900",
  },
} as const;

const Input: React.FC<InputBaseProps> = ({
  inputObject,
  setTouched,
  errors,
  onChange,
  inputValue,
  shouldShowErrors,
  type = "neo",
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
        className={`w-full rounded-xl border-2 bg-secondary py-2.5 px-4 ${
          types[type].default
        } ${shouldShowErrors ? "border-red-500" : types[type].border}`}
      />
      <div className="mt-1 flex flex-col gap-y-1 px-2">
        {inputObject.rated ? <PasswordStrength value={inputValue} /> : null}
        <InputError errors={errors} shouldShowErrors={shouldShowErrors} />
      </div>
    </div>
  );
};

export default Input;
