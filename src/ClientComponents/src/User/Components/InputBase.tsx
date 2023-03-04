export type InputBasePropsType = {
  name: string;
  label: string;
  isInvalid?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function InputBase({
  name,
  label,
  isInvalid,
}: InputBasePropsType) {
  return (
    <input
      name={name}
      placeholder={label}
      className={`w-full border-2 bg-secondary py-2.5 shadow-neo-1 rounded-xl px-4 outline-none ${
        isInvalid ? "border-red-500" : "focus:border-violet-600"
      }`}
    />
  );
}
