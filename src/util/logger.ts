import winston, { LoggerOptions } from "winston";

const options: LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level:
        process.env.NODE_ENV === "production" ? "error" : "debug",
    }),
    new winston.transports.File({
      filename: "debug.log",
      level: "debug",
    }),
  ],
};

const logger = winston.createLogger(options);

export default logger;
