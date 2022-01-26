import { check, validationResult } from "express-validator";
import { Response, Request, NextFunction } from "express";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await check("email", "email is not valid")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false })
    .run(req);
  await check("password", "password cannot be blank")
    .isLength({ min: 1 })
    .run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: true,
      errors: errors.array(),
    });
  }
  next();
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await check("email", "email is not valid")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false })
    .run(req);
  await check("password", "password cannot be blank")
    .isLength({ min: 1 })
    .run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: true,
      errors: errors.array(),
    });
  }
  next();
};
