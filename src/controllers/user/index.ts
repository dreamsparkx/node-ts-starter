import { NextFunction, Request, Response } from "express";
import { UserDocument, User } from "../../models/User";
import {
  ConflictError,
  BadRequestError,
  InternalServerError,
  UnAuthorizedRequestError,
} from "../../util/error";

/**
 * Returns either an error or returns success if user is registered
 * @param req - The request object
 * @param res - The response object
 * @param next - the next function
 * @returns either an error or returns success if user is registered
 */
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
    res.status(201).json({
      error: false,
      message: "User Registered",
    });
    return;
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
  res.status(200).json({
    user: req.user,
  });
  return;
};

export const changeUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  const result = await User.findOne({ _id: req.user._id });
  if (email) {
    result.email = email;
  }
  if (password) {
    result.password = password;
  }
  try {
    await result.save();
  } catch (ex) {
    return next(
      new BadRequestError("Could not save user details", ex),
    );
  }
  res.status(200).json({
    error: false,
    message: "User Updated",
  });
  return;
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await User.deleteOne({ _id: req.user._id });
    if (result && result.deletedCount === 1) {
      res.sendStatus(204);
      return;
    }
    return next(new UnAuthorizedRequestError("Invalid user"));
  } catch (err) {
    return next(
      new InternalServerError("Internal Server Error", err),
    );
  }
};
