import "express";
import { JWTUser } from "./models/User";

declare module "express" {
    export interface Request {
        user?: JWTUser;
    }
}

declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: "development" | "production";
        ACCESS_TOKEN_SECRET: string;
        SESSION_SECRET: string;
        MONGODB_URI_LOCAL: string;
        MONGODB_URI: string;
    }
}