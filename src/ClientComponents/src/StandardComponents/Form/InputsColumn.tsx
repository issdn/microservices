import Input, { InputTypes } from "./Input";
import { InputsObjectsType, useInputs } from "./hooks";

type InputsColumnProps = {
  inputsObject: InputsObjectsType;
  formInputs: ReturnType<typeof useInputs>;
  type?: InputTypes;
};

const InputsColumn: React.FC<InputsColumnProps> = ({
  inputsObject,
  formInputs,
  type = "neo",
}) => {
  const {
    errors,
    setErrors,
    touched,
    setTouched,
    getInputValue,
    setInputValue,
  } = formInputs;
  return (
    <div className="flex w-full flex-col gap-y-4">
      {Object.values(inputsObject).map((inputObject) => (
        <Input
          type={type}
          key={inputObject.name}
          inputObject={inputObject}
          errors={errors[inputObject.name]}
          inputValue={getInputValue(inputObject.name)}
          shouldShowErrors={
            touched[inputObject.name] && errors[inputObject.name].length > 0
          }
          setTouched={() => setTouched(inputObject.name)}
          onChange={(e) => {
            setInputValue(inputObject.name, e.target.value as string);
            setErrors(
              inputObject.name,
              inputObject.validator.validate(e.target.value)
            );
          }}
        />
      ))}
    </div>
  );
};

export default InputsColumn;
