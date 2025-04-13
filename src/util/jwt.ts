import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "./secrets";
import type { StringValue } from "ms";

/**
 * Returns signedJWT
 *
 * @remarks
 * This signs object of any type
 *
 * @param toBeSignedObj - The object that needs to be signed
 * @param expiresIn - Expiry time for the object
 * @returns signed JWT
 */

export const generateJWT = (
  toBeSignedObj: string | Buffer | object,
  expiresIn?: StringValue | number,
) => {
  return jwt.sign(toBeSignedObj, ACCESS_TOKEN_SECRET, {
    expiresIn: expiresIn || "1800s",
  });
};
