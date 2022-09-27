import winston, { LoggerOptions, format } from "winston";
import { TransformableInfo } from "logform";
const { combine, colorize, printf, timestamp, label } = format;

const myFormat = printf((info: TransformableInfo) => {
  return `${info.timestamp} ${info.label} ${info.level}: ${info.message}`;
});

export const options: LoggerOptions = {
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
  format: combine(
    colorize(),
    label({ label: "[app-server]" }),
    timestamp(),
    myFormat,
  ),
};

const logger = winston.createLogger(options);

export default logger;
