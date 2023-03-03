import { InputsObjectsType, useInputs } from "../hooks";
import Input from "./Input";

export default function InputStack({
  inputsObject,
}: {
  inputsObject: InputsObjectsType;
}) {
  const { setInputValue, getInputValue } = useInputs(inputsObject);

  return (
    <div className="flex flex-col gap-y-4 w-full">
      {Object.values(inputsObject).map((inputObject) => (
        <Input
          key={inputObject.name}
          inputObject={inputObject}
          setInputValue={setInputValue}
          getInputValue={getInputValue}
        />
      ))}
    </div>
  );
}
