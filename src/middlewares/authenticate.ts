import { Response, Request, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { JWTUser } from "../models/User";
import { ACCESS_TOKEN_SECRET } from "../util/secrets";

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
          return res.status(403).json({
            error: true,
            errors: [err],
          });
        }
        req.user = user;
        return next();
      },
    );
  }
  return res.status(406).json({
    error: true,
    message: "Send corrent headers",
  });
};
