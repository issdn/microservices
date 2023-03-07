export type InputErrorProps = {
  errors: string[];
  shouldShowErrors: boolean;
};

const InputError: React.FC<InputErrorProps> = ({
  errors,
  shouldShowErrors,
}) => {
  if (shouldShowErrors) {
    return <p className="text-red-500 text-sm">{errors[0]}</p>;
  } else return null;
};

export default InputError;
