import { expect, test } from "vitest";
import { validator } from "./validation";
import { useInputs } from "./hooks";

const testInputsObjects = [
  {
    name: "name",
    label: "Name",
    type: "text",
    validator: validator().required().min(3).max(20),
  } as const,
  {
    name: "password",
    label: "Password",
    type: "password",
    validator: validator().required().min(8).max(20),
  } as const,
];

const {
  errors,
  setErrors,
  touched,
  setTouched,
  inputsValues,
  getInputValue,
  setInputValue,
  setAllTouched,
} = useInputs(testInputsObjects);

test("inputs should give errors on initialization", () => {
  expect(errors.name).toEqual([
    "Field is required.",
    "Must be minimally 3 characters long.",
    "Must be maximally 20 characters long.",
  ]);
  expect(errors.password).toEqual([
    "Field is required.",
    "Must be minimally 8 characters long.",
    "Must be maximally 20 characters long.",
  ]);
});
