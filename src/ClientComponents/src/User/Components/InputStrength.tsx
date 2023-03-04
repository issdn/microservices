import { getPasswordStrength } from "../functions";

export default function PasswordStrength({ value }: { value: string }) {
  const passwordStrength = getPasswordStrength(value);
  return (
    <div className="flex flex-row justify-between w-full">
      <p className="text-[.85rem] whitespace-nowrap">Password strength:</p>
      <div className="flex flex-row gap-x-2 items-center">
        <div
          className={`w-8 md:w-12 h-1.5 ${
            passwordStrength > 0 ? "bg-violet-300" : "bg-gray-300"
          } rounded-full`}
        ></div>
        <div
          className={`w-8 md:w-12 h-1.5 ${
            passwordStrength > 1 ? "bg-violet-400" : "bg-gray-300"
          } rounded-full`}
        ></div>
        <div
          className={`w-8 md:w-12 h-1.5 ${
            passwordStrength > 2 ? "bg-violet-500" : "bg-gray-300"
          } rounded-full`}
        ></div>
        <div
          className={`w-8 md:w-12 h-1.5 ${
            passwordStrength > 3 ? "bg-violet-600" : "bg-gray-300"
          } rounded-full`}
        ></div>
      </div>
    </div>
  );
}
