type FormProps = {
  children?: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  setAllTouched: any;
  canSubmitForm: () => boolean;
  styles?: string;
};

const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  setAllTouched,
  canSubmitForm,
  styles = "",
}) => {
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setAllTouched();
    if (!canSubmitForm()) return;
    onSubmit(e);
  };

  return (
    <form
      onSubmit={submitHandler}
      className={`${styles} flex w-full flex-col items-center justify-center bg-secondary px-2 sm:w-[30rem] md:px-4`}
    >
      {children}
    </form>
  );
};

export default Form;
