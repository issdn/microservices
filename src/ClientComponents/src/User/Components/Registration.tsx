import RippleButton from "./RippleButton";
import Form from "../../StandardComponents/Form/Form";
import InputsColumn from "../../StandardComponents/Form/InputsColumn";
import {
  InputsObjectsType,
  useInputs,
} from "../../StandardComponents/Form/hooks";
import {
  canSubmitForm,
  validator,
} from "../../StandardComponents/Form/validation";
import { useToastContext } from "../../StandardComponents/Toast/toastContext";
import { useFetch } from "../../StandardComponents/fetch";

const inputsObject: InputsObjectsType = [
  {
    name: "username",
    label: "Username",
    type: "text",
    validator: validator()
      .required("Username is requried.")
      .min(8, "Username must be at least 8 characters long.")
      .max(32, "Username must be at most 32 characters long."),
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    rated: true,
    validator: validator()
      .required("Password is requried.")
      .min(8, "Password must be at least 8 characters long.")
      .max(64, "Password must be at most 64 characters long."),
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    validator: validator().required("Email is requried.").email(),
  },
];

const Registration: React.FC = () => {
  const formInputs = useInputs(inputsObject);

  const { addToast } = useToastContext();

  const responseHandlers = {
    201: () => {
      addToast({ title: "Registered successfully", type: "success" });
      formInputs.clearInputs();
    },
    400: () => addToast({ title: "Couldn't register.", type: "error" }),
    default: () =>
      addToast({
        title: "Login failed because of an unknown error.",
        type: "error",
      }),
  };

  const { loading, post } = useFetch();

  const onSubmit = async () => {
    await post(
      "user/v1/auth/register",
      responseHandlers,
      formInputs.inputsValues
    );
  };

  return (
    <div className="font-mono text-neutral-800 drop-shadow-md">
      <Form
        styles="gap-y-4 py-8"
        onSubmit={onSubmit}
        canSubmitForm={() =>
          canSubmitForm(inputsObject, formInputs.inputsValues)
        }
        setAllTouched={formInputs.setAllTouched}
      >
        <h1 className="text-2xl">Register</h1>
        <InputsColumn inputsObject={inputsObject} formInputs={formInputs} />
        <RippleButton loading={loading}>Register</RippleButton>
      </Form>
    </div>
  );
};

export default Registration;
