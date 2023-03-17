/**
 * Checks if the value is null.
 * Mainly for datatbase values.
 * @param value Any value
 * @returns boolean
 */
export const isNull = (value: any) => {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    value === "null" ||
    value === "undefined"
  );
};
