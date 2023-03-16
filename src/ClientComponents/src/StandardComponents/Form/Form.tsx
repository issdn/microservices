import { InputsObjectsType, useInputs } from "./hooks";
import { canSubmitForm } from "./validation";
import Button from "../Button";
import Input from "./Input";

type FormProps = {
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  inputsObject: InputsObjectsType;
  heading: string;
  buttonText: string;
  formInputs: ReturnType<typeof useInputs>;
};

const Form: React.FC<FormProps> = ({
  onSubmit,
  isLoading,
  inputsObject,
  heading,
  buttonText,
  formInputs,
}) => {
  const {
    errors,
    setErrors,
    touched,
    setTouched,
    inputsValues,
    getInputValue,
    setInputValue,
    setAllTouched,
  } = formInputs;

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setAllTouched();
    if (!canSubmitForm(inputsObject, inputsValues)) return;
    onSubmit(e);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-secondary text-neutral-800 px-2 w-full md:px-0 sm:w-[30rem] flex flex-col justify-center items-center gap-y-10 p-8 drop-shadow-md font-mono"
    >
      <h1 className="text-2xl ">{heading}</h1>
      <div className="flex flex-col gap-y-4 md:px-8 w-full">
        <div className="flex flex-col gap-y-4 w-full">
          {Object.values(inputsObject).map((inputObject) => (
            <Input
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
        <Button loading={isLoading}>{buttonText}</Button>
      </div>
    </form>
  );
};

export default Form;
