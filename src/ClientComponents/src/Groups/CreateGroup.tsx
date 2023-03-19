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
import { useSession } from "../User/sessionContext";
import { GroupType } from "./types";

type CreateGroupProps = {
  addGroup: (group: GroupType) => void;
  close: ReturnType<typeof useModal>["close"];
};

const inputsObject: InputsObjectsType = [
  {
    name: "name",
    label: "Group Name",
    type: "text",
    validator: validator()
      .required("Group name is required.")
      .max(128, "Username must be at most 128 characters long."),
  },
];

const CreateGroup: React.FC<CreateGroupProps> = ({ addGroup, close }) => {
  const session = useSession();
  const { addToast } = useToastContext();
  const { loading, post } = useFetch();
  const formInputs = useInputs(inputsObject);

  const responseHandlers = {
    200: (response: { token: GroupType["token"]; id: GroupType["id"] }) => {
      addToast({ title: "Created successfully.", type: "success" });
      addGroup({
        token: response.token,
        id: response.id,
        avatar_url: "",
        name: formInputs.inputsValues.name,
        owner_id: session.id,
      });
      close();
    },
    403: () => {
      addToast({ title: "You are not allowed to do this.", type: "error" });
    },
    409: () => {
      addToast({
        title: "Group with that name already exists.",
        type: "error",
      });
    },
    400: () => addToast({ title: "Couldn't create a group.", type: "error" }),
    default: () =>
      addToast({
        title: "Something unexpected went wrong.",
        type: "error",
      }),
  };

  const onSubmit = async () => {
    await post(
      "/group/v1/" + session.id,
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
          <h1 className="text-2xl">Create a group</h1>
          <div className="flex w-full flex-col gap-y-4">
            <InputsColumn
              type="primary"
              inputsObject={inputsObject}
              formInputs={formInputs}
            />
            <Button loading={loading}>Create</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateGroup;
