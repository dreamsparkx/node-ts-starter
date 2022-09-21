import errorHandler from "errorhandler";
import https from "https";
import fs from "fs";
import app from "./app";

/**
 * Error Handler. Provides full stack
 */
if (process.env.NODE_ENV !== "production") {
  app.use(errorHandler());
}

/**
 * Start express server
 */
if (
  process.env.NODE_ENV !== "production" &&
  fs.readFileSync("ssl/server.key") &&
  fs.readFileSync("ssl/server.cert")
) {
  https
    .createServer(
      {
        key: fs.readFileSync("ssl/server.key"),
        cert: fs.readFileSync("ssl/server.cert"),
      },
      app,
    )
    .listen(app.get("port"), () => {
      console.log(
        "  App is running at https://localhost:%d in %s mode",
        app.get("port"),
        app.get("env"),
      );
      console.log("  Press CTRL-C to stop\n");
    });
} else {
  app.listen(app.get("port"), () => {
    console.log(
      "  App is running at http://localhost:%d in %s mode",
      app.get("port"),
      app.get("env"),
    );
    console.log("  Press CTRL-C to stop\n");
  });
}
