import { ErrorFields, FormFields, Validation } from "./types";

export const getErrorFields = (
  form: FormFields,
  validation: Validation
): ErrorFields =>
  Object.keys(form).reduce((acc: ErrorFields, key: string) => {
    if (!validation[key]) return acc;

    const errorsPerField = validation[key]
      .map((rule) => ({
        isValid: rule.isValid(form[key]),
        message: rule.message,
      }))
      .filter((error) => !error.isValid);

    return { ...acc, [key]: errorsPerField };
  }, {});

export const VALIDATION: Validation = {
  firstName: [
    {
      isValid: (value: string) => value.length > 0,
      message: "First name is required.",
    },
  ],
  lastName: [
    {
      isValid: (value: string) => value.length > 0,
      message: "Last name is required.",
    },
  ],
  email: [
    {
      isValid: (value: string) => /\S+@\S+\.\S+/.test(value),
      message: "Email must be a valid email address.",
    },
  ],
  password: [
    {
      isValid: (value: string) => value.length >= 8,
      message: "Password must be at least 8 characters long.",
    },
  ],
};
