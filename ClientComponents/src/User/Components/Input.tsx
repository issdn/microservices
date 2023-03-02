import { useState } from "react";

export default function Input({
  name,
  placeholder,
  setValue,
  errors,
}: {
  name: string;
  placeholder: string;
  setValue: (value: string) => void;
  errors: string[];
}) {
  const [isInvalid, setIsInvalid] = useState(false);

  return (
    <div className="flex flex-col gap-y-1 w-full">
      <input
        onBlur={() => {
          setIsInvalid(true);
        }}
        onChange={(e) => {
          setValue(e.target.value as string);
        }}
        name={name}
        placeholder={placeholder}
        className={`w-full border-2 bg-secondary py-2.5 shadow-neo-1 rounded-xl px-4 outline-none ${
          isInvalid && errors.length > 0
            ? "border-red-500"
            : "focus:border-majorelle"
        }`}
      />
      {isInvalid && errors.length > 0 ? (
        <p className="text-red-500 text-sm">{errors[0]}</p>
      ) : null}
    </div>
  );
}
