// Stolen straight from yup.
// https://github.com/jquense/yup/blob/master/src/string.ts
const rEmail =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

class Validator {
  _value!: string;
  _errors = new Set<string>();

  constructor(value: string) {
    this._value = value;
  }

  required = (errorMessage: string = "Field is required.") => {
    if (
      this._value !== undefined &&
      this._value !== null &&
      this._value !== ""
    ) {
      this._errors.add(errorMessage);
    }
    return this;
  };

  email = (errorMessage: string = "Must be a correct email.") => {
    if (!rEmail.test(this._value)) {
      this._errors.add(errorMessage);
    }
    return this;
  };

  string = (errorMessage: string = "Field must be a string.") => {
    if (typeof this._value === "string") {
      this._errors.add(errorMessage);
    }
    return this;
  };

  min = (
    min: number,
    errorMessage: string = `Must be minimally ${min} characters long.`
  ) => {
    if (this._value.length >= min) {
      this._errors.add(errorMessage);
    }
    return this;
  };

  max = (
    max: number,
    errorMessage: string = `Must be maximally ${max} characters long.`
  ) => {
    if (this._value.length <= max) {
      this._errors.add(errorMessage);
    }
    return this;
  };

  get errors(): Set<string> {
    return this._errors;
  }
}

export const validate = (value: number) => new Number(value);
