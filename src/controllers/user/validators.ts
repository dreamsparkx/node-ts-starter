import Joi from "joi";
import { Response, Request, NextFunction } from "express";
import { BadRequestError } from "../../util/error";

const UserJoiSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(1).required(),
});

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error } = UserJoiSchema.validate(req.body || {});
    if (error) {
      const { details } = error;
      throw new BadRequestError("Validation Errors", details);
    }
  } catch (err) {
    return next(err);
  }
  return next();
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error } = Joi.object()
      .keys({
        email: Joi.string().email().optional(),
        password: Joi.string().when("email", {
          is: Joi.exist(),
          then: Joi.optional(),
          otherwise: Joi.required(),
        }),
      })
      .validate(req.body || {});
    if (error) {
      const { details } = error;
      throw new BadRequestError("Validation Errors", details);
    }
  } catch (ex) {
    return next(ex);
  }
  return next();
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error } = UserJoiSchema.validate(req.body || {});
    if (error) {
      const { details } = error;
      throw new BadRequestError("Validation Errors", details);
    }
  } catch (err) {
    return next(err);
  }
  return next();
};
