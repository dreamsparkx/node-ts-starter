import "express";
import { JWTUser } from "./models/User";

declare module "express" {
  export interface Request {
    user?: JWTUser;
  }
}
