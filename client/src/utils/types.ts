export type ValidationRule = {
  isValid: (value: any) => boolean;
  message: string;
};

export type Validation = {
  [key: string]: ValidationRule[];
};

export type FormFields = {
  [key: string]: any;
};

export type ErrorField = {
  isValid: boolean;
  message: string;
};

export type ErrorFields = {
  [key: string]: ErrorField[];
};
