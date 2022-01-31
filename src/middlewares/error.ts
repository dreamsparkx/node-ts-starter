import { Response, Request, NextFunction } from "express";
import { GeneralError } from "../util/error";

export const handleErrors = async (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      error: true,
      message: err.message,
      errors: err.errors,
    });
  }
  return res.status(500).json({
    error: true,
    message: err.message || "Internal Server Error",
  });
};
