import { expect, test } from "vitest";
import { validator } from "./validation";
import { useInputs, useFetch } from "./hooks";
import { act, renderHook } from "@testing-library/react";

const testInputsObjects = [
  {
    name: "username",
    label: "Username",
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

test("inputs should give errors on initialization", () => {
  const { result } = renderHook(() => useInputs(testInputsObjects));

  expect(result.current.errors.username).toEqual([
    "Field is required.",
    "Must be minimally 3 characters long.",
  ]);
  expect(result.current.errors.password).toEqual([
    "Field is required.",
    "Must be minimally 8 characters long.",
  ]);
});

test("should set new errors and give them back", () => {
  let { result, rerender } = renderHook(() => useInputs(testInputsObjects));

  act(() => {
    result.current.setErrors("username", ["Username is not valid."]);
  });
  act(() => {
    result.current.setErrors("password", ["Password is not valid."]);
  });

  rerender();

  expect(result.current.errors.username).toEqual(["Username is not valid."]);
  expect(result.current.errors.password).toEqual(["Password is not valid."]);
});

test("should set new values and give them back", () => {
  let { result, rerender } = renderHook(() => useInputs(testInputsObjects));

  act(() => {
    result.current.setInputValue("username", "newUsername");
  });
  act(() => {
    result.current.setInputValue("password", "newPassword");
  });

  rerender();

  expect(result.current.getInputValue("username")).toEqual("newUsername");
  expect(result.current.getInputValue("password")).toEqual("newPassword");
});

test("should set touched and give it back", () => {
  const { result, rerender } = renderHook(() => useInputs(testInputsObjects));

  act(() => {
    result.current.setTouched("username");
  });
  act(() => {
    result.current.setTouched("password");
  });

  rerender();

  expect(result.current.touched["username"]).toEqual(true);
  expect(result.current.touched["password"]).toEqual(true);
});
