// Stolen straight from yup.
// https://github.com/jquense/yup/blob/master/src/string.ts
const rEmail =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

class StringValidator {
  private _tests: Set<{ message: string; rule: (value: string) => boolean }>;

  constructor() {
    this._tests = new Set();
  }

  public required = (errorMessage: string = "Field is required.") => {
    this._tests.add({
      message: errorMessage,
      rule: (value) => value === undefined || value === null || value === "",
    });
    return this;
  };

  public email = (errorMessage: string = "Must be a correct email.") => {
    this._tests.add({
      message: errorMessage,
      rule: (value) => !rEmail.test(value),
    });
    return this;
  };

  public min = (
    min: number,
    errorMessage: string = `Must be minimally ${min} characters long.`
  ) => {
    this._tests.add({
      message: errorMessage,
      rule: (value) => value.length < min,
    });
    return this;
  };

  public max = (
    max: number,
    errorMessage: string = `Must be maximally ${max} characters long.`
  ) => {
    this._tests.add({
      message: errorMessage,
      rule: (value) => value.length > max,
    });
    return this;
  };

  public validate = (value: string) => {
    let _errors: string[] = [];
    this._tests.forEach((test) => {
      if (test.rule(value)) {
        _errors.push(test.message);
      }
    });
    return _errors;
  };
}

export const validator = () => new StringValidator();
export type ValidatorType = StringValidator;
