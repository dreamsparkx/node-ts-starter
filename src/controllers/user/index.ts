import { Request, Response } from "express";
import { UserDocument, User } from "../../models/User";

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = new User({
    email,
    password,
  });
  try {
    const existingUser: UserDocument = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: true,
        message: "User already exists",
      });
    }
    await user.save();
    return res.status(201).json({
      error: false,
      message: "User Registered",
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      errors: [err],
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return existingUser.comparePassword(
      password,
      (err: Error, isMatch: boolean) => {
        if (err) {
          return res.status(400).json({
            error: true,
            errors: [err],
          });
        }
        if (isMatch) {
          return res.status(200).json({
            token: existingUser.generateJWTToken(),
          });
        }
        return res.status(401).json({
          error: true,
          message: "Invalid email or password",
        });
      },
    );
  }
  return res.status(400).json({
    error: true,
  });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  return res.status(200).json({
    user: req.user,
  });
};
