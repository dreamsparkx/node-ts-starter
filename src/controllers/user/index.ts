import { NextFunction, Request, Response } from "express";
import { UserDocument, User } from "../../models/User";
import {
  ConflictError,
  BadRequestError,
  InternalServerError,
} from "../../util/error";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  const user = new User({
    email,
    password,
  });
  try {
    const existingUser: UserDocument = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictError("User already exists");
    }
    await user.save();
    return res.status(201).json({
      error: false,
      message: "User Registered",
    });
  } catch (err) {
    return next(err);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return existingUser.comparePassword(
      password,
      (err: Error, isMatch: boolean) => {
        if (err) {
          return next(
            new InternalServerError("Invalid email or password", [
              err,
            ]),
          );
        }
        if (isMatch) {
          return res.status(200).json({
            token: existingUser.generateJWTToken(),
          });
        }
        return next(new BadRequestError("Invalid email or password"));
      },
    );
  }
  return next(new BadRequestError("Invalid email or password"));
};

export const getCurrentUser = (req: Request, res: Response) => {
  return res.status(200).json({
    user: req.user,
  });
};
