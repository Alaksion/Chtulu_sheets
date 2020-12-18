import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string;
}

export default function GetValidationError(
  error: ValidationError,
): ValidationErrors {
  const Errors: ValidationErrors = {};

  error.inner.forEach(err => {
    if (err.path) {
      Errors[err.path] = err.message;
    }
  });

  return Errors;
}
