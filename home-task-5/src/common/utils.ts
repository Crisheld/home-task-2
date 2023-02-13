import { NextFunction } from "express";
import { AppError } from "./AppError";

export const throwError = (message: string, next: NextFunction): void => {
  const error = new AppError(message);
  error.status = 400;
  next(error)
};
