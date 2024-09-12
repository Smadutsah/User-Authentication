import { ValidationError } from 'class-validator';

export const getErrorMessage = (error: ValidationError[]): string | undefined => {
  if (error.length == 0) return undefined;

  return Object.values(Object.setPrototypeOf(error[0].constraints, null))[0] as string;
};
