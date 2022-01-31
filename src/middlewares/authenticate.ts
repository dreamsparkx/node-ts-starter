import { Response, Request, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { JWTUser } from "../models/User";
import { ACCESS_TOKEN_SECRET } from "../util/secrets";
import { ForbiddenError, NotAcceptableError } from "../util/error";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response => {
  const authHeaders = req.headers.authorization;
  const token = authHeaders && authHeaders.split(" ")[1];
  if (token) {
    return jwt.verify(
      token,
      ACCESS_TOKEN_SECRET,
      (err: VerifyErrors, user: JWTUser) => {
        if (err) {
          throw new ForbiddenError("Error verifying user", [err]);
        }
        req.user = user;
        return next();
      },
    );
  }
  throw new NotAcceptableError("Send corrent headers");
};
