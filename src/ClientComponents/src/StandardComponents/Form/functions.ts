import zxcvbn from "zxcvbn";

export const getPasswordStrength = (password: string) => zxcvbn(password).score;
