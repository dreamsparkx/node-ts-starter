import expressWinston, { LoggerOptions } from "express-winston";
import { options } from "../util/logger";

export default expressWinston.logger({
  ...(options as LoggerOptions),
  meta: false,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
  ignoreRoute: function () {
    return false;
  },
});
