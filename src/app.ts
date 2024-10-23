import express from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import cors from "cors";
import path from "path";
import compression from "compression";
import bodyParser from "body-parser";
import session from "express-session";
import flash from "express-flash";
import lusca from "lusca";
import { SESSION_SECRET, MONGODB_URI, PORT } from "./util/secrets";
import logger from "./util/logger";
import routes from "./routes";
import { handleErrors } from "./middlewares/error";
import expressWinston from "./middlewares/winston";

const app = express();
const mongoUrl = MONGODB_URI;
mongoose
  .connect(mongoUrl, {
    directConnection: true,
    serverSelectionTimeoutMS: 2000,
  })
  .then(() => {
    logger.debug("Mongo Connected");
  })
  .catch((err) => {
    logger.error(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`,
    );
    process.exit(1);
  });

app.set("port", PORT);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cors());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
      mongoUrl,
    }),
  }),
);
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: 31557600000,
  }),
); // 1 year
app.use(expressWinston);
app.use(routes);
app.use(handleErrors);
export default app;

// https://gist.github.com/jimothyGator/5436538
// https://gist.github.com/netpoetica/5879685
// https://smali-kazmi.medium.com/setup-nginx-node-js-on-mac-os-x-b31eda9f7d5d
// https://www.sitepoint.com/configuring-nginx-ssl-node-js/
// https://adamtheautomator.com/nginx-on-mac/
// https://developer.redis.com/create/docker/nodejs-nginx-redis/
// https://codeburst.io/building-a-simple-single-sign-on-sso-server-and-solution-from-scratch-in-node-js-ea6ee5fdf340
