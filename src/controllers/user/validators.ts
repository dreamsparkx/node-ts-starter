import { check, validationResult } from "express-validator";
import { Response, Request, NextFunction } from "express";
import { BadRequestError } from "../../util/error";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await check("email", "email is not valid")
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false })
      .run(req);
    await check("password", "password cannot be blank")
      .isLength({ min: 1 })
      .run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError("Validation Errors", errors.array());
    }
  } catch (err) {
    return next(err);
  }
  return next();
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await check("email", "email is not valid")
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false })
      .run(req);
    await check("password", "password cannot be blank")
      .isLength({ min: 1 })
      .run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError("Validation Errors", errors.array());
    }
  } catch (err) {
    return next(err);
  }
  return next();
};
