export type InputErrorPropsType = {
  errors: string[];
  shouldShowErrors: boolean;
};

export default function InputError({
  errors,
  shouldShowErrors,
}: InputErrorPropsType) {
  if (shouldShowErrors) {
    return <p className="text-red-500 text-sm">{errors[0]}</p>;
  } else return null;
}
