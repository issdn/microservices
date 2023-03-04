import { InputsObjectsType, useInputs } from "../hooks";
import Input from "./Input";

export default function InputStack({
  inputsObject,
  formInputs,
}: {
  inputsObject: InputsObjectsType;
  formInputs: ReturnType<typeof useInputs>;
}) {
  return (
    <div className="flex flex-col gap-y-4 w-full">
      {Object.values(inputsObject).map((inputObject) => (
        <Input
          key={inputObject.name}
          inputObject={inputObject}
          formInputs={formInputs}
        />
      ))}
    </div>
  );
}
