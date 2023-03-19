import {
  InputsObjectsType,
  useInputs,
} from "../../StandardComponents/Form/hooks";
import {
  canSubmitForm,
  validator,
} from "../../StandardComponents/Form/validation";
import Form from "../../StandardComponents/Form/Form";
import { useSession } from "../sessionContext";
import { useFetch } from "../../StandardComponents/fetch";
import { useToastContext } from "../../StandardComponents/Toast/toastContext";
import InputsColumn from "../../StandardComponents/Form/InputsColumn";
import RippleButton from "./RippleButton";

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
    validator: validator()
      .required("Password is requried.")
      .min(8, "Password must be at least 8 characters long.")
      .max(64, "Password must be at most 64 characters long."),
  },
];

const Login = () => {
  const responseHandlers = {
    200: () => {
      addToast({ title: "Login successful.", type: "success" });
      session.login();
    },
    400: () =>
      addToast({ title: "Invalid password or username.", type: "error" }),
    default: () =>
      addToast({
        title: "Login failed because of an unknown error.",
        type: "error",
      }),
  };

  const session = useSession();
  const { addToast } = useToastContext();
  const { loading, post } = useFetch();
  const formInputs = useInputs(inputsObject);

  const onSubmit = async () => {
    await post(
      "/user/v1/auth/login",
      responseHandlers,
      formInputs.inputsValues
    );
  };

  return (
    <div className="flex flex-col gap-y-8 font-mono text-neutral-800 drop-shadow-md">
      <Form
        styles="gap-y-4 py-8"
        onSubmit={onSubmit}
        canSubmitForm={() =>
          canSubmitForm(inputsObject, formInputs.inputsValues)
        }
        setAllTouched={formInputs.setAllTouched}
      >
        <h1 className="text-2xl">Login</h1>
        <InputsColumn inputsObject={inputsObject} formInputs={formInputs} />
        <RippleButton loading={loading}>Login</RippleButton>
      </Form>
    </div>
  );
};

export default Login;
