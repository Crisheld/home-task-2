import { APPERROR } from "./constants";

export const throwError = (message: string): void => {
    const error = new Error(message);
    error.name = APPERROR;
    throw error;
  };
  