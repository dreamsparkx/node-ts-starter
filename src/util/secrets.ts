import dotenv from "dotenv";
import fs from "fs";
import logger from "./logger";

if (fs.existsSync(".env")) {
  logger.debug(
    "Using .env file to supply config environment variables",
  );
  dotenv.config({
    path: ".env",
  });
} else {
  logger.debug(
    "Using .env.example file to supply config environment variables",
  );
  dotenv.config({ path: ".env.example" }); // you can delete this after you create your own .env file!
}
const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

const { SESSION_SECRET, ACCESS_TOKEN_SECRET } = process.env;
const MONGODB_URI = prod
  ? process.env.MONGODB_URI
  : process.env.MONGODB_URI_LOCAL;
const PORT = process.env.PORT || 3000;

if (!SESSION_SECRET) {
  logger.error(
    "No client secret. Set SESSION_SECRET environment variable.",
  );
  process.exit(1);
}

if (!ACCESS_TOKEN_SECRET) {
  logger.error(
    "No access token secret. Set ACCESS_TOKEN_SECRET environment variable.",
  );
  process.exit(1);
}

if (!MONGODB_URI) {
  if (prod) {
    logger.error(
      "No mongo connection string. Set MONGODB_URI environment variable.",
    );
  } else {
    logger.error(
      "No mongo connection string. Set MONGODB_URI_LOCAL environment variable.",
    );
  }
  process.exit(1);
}
export {
  ENVIRONMENT,
  SESSION_SECRET,
  ACCESS_TOKEN_SECRET,
  MONGODB_URI,
  PORT,
};
