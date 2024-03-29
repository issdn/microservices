import Button from "../StandardComponents/Button";
import Form from "../StandardComponents/Form/Form";
import InputsColumn from "../StandardComponents/Form/InputsColumn";
import { InputsObjectsType, useInputs } from "../StandardComponents/Form/hooks";
import {
  canSubmitForm,
  validator,
} from "../StandardComponents/Form/validation";
import { useModal } from "../StandardComponents/Modal/Modal";
import { useToastContext } from "../StandardComponents/Toast/toastContext";
import { useFetch } from "../StandardComponents/fetch";
import { GroupType } from "./types";

type JoinGroupProps = {
  close: ReturnType<typeof useModal>["close"];
  addGroup: (group: GroupType) => void;
};

const inputsObject: InputsObjectsType = [
  {
    name: "token",
    label: "Group Token",
    type: "text",
    validator: validator().required("Group token is required."),
  },
];

const JoinGroup: React.FC<JoinGroupProps> = ({ close, addGroup }) => {
  const { addToast } = useToastContext();
  const { loading, post } = useFetch();
  const formInputs = useInputs(inputsObject);

  const responseHandlers = {
    200: (response: GroupType) => {
      addToast({ title: "Joined succesfully.", type: "success" });
      addGroup(response);
      close();
    },
    400: () => addToast({ title: "Couldn't join.", type: "error" }),
    default: () =>
      addToast({
        title: "Something unexpected went wrong.",
        type: "error",
      }),
    403: () => {
      addToast({ title: "You are not allowed to do this.", type: "error" });
    },
    404: () => {
      addToast({ title: "Group not found.", type: "error" });
    },
  };

  const onSubmit = async () => {
    await post(
      "/group/v1/join/" + formInputs.inputsValues.token,
      responseHandlers,
      formInputs.inputsValues
    );
  };

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-4">
        <Form
          onSubmit={onSubmit}
          canSubmitForm={() =>
            canSubmitForm(inputsObject, formInputs.inputsValues)
          }
          setAllTouched={formInputs.setAllTouched}
        >
          <h1 className="text-2xl">Join a group</h1>
          <div className="flex w-full flex-col items-center gap-y-4">
            <InputsColumn
              type="primary"
              inputsObject={inputsObject}
              formInputs={formInputs}
            />
            <Button loading={loading}>Join</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default JoinGroup;
