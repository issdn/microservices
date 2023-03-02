// Stolen straight from yup.
// https://github.com/jquense/yup/blob/master/src/string.ts
const rEmail =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

class StringValidator {
  public rules: {
    [key: string]: { message: string; rule: (value: string) => boolean };
  } = {};
  private _value!: string;
  private _errors = new Array<string>();

  constructor(value: string) {
    this._value = value;
  }

  public required = (errorMessage: string = "Field is required.") => {
    if (
      this._value === undefined ||
      this._value === null ||
      this._value === ""
    ) {
      this._errors.push(errorMessage);
    }
    return this;
  };

  public email = (errorMessage: string = "Must be a correct email.") => {
    if (!rEmail.test(this._value)) {
      this._errors.push(errorMessage);
    }
    return this;
  };

  public min = (
    min: number,
    errorMessage: string = `Must be minimally ${min} characters long.`
  ) => {
    if (this._value.length < min) {
      this._errors.push(errorMessage);
    }
    return this;
  };

  public max = (
    max: number,
    errorMessage: string = `Must be maximally ${max} characters long.`
  ) => {
    if (this._value.length > max) {
      this._errors.push(errorMessage);
    }
    return this;
  };

  get errors() {
    return this._errors;
  }
}

export const validator = (value: string) => new StringValidator(value);
export type ValidatorType = StringValidator;
