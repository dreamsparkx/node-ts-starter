import { Request, Response } from "express";
import expressWinston, { LoggerOptions } from "express-winston";
import { options } from "../util/logger";

export default expressWinston.logger({
  ...(options as LoggerOptions),
  meta: true,
  msg: (req: Request, res: Response) => {
    return `${req.method} ${req.url} ${res.statusCode} {{res.responseTime}}ms`;
  },
  expressFormat: false,
  colorize: true,
  ignoreRoute: function () {
    return false;
  },
});
