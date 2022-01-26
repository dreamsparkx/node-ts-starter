import express, { Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import { ENVIRONMENT } from "../util/secrets";
import { specs } from "../util/swagger";

const swaggerRouter = express.Router();

if (ENVIRONMENT !== "production") {
  swaggerRouter.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(specs, { explorer: true }),
  );
  swaggerRouter.get(
    "/swagger.json",
    (req: Request, res: Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(specs);
    },
  );
  swaggerRouter.get("/redoc", (req: Request, res: Response) => {
    res.render("redoc");
  });
}

// https://blog.logrocket.com/documenting-your-express-api-with-swagger/
// https://levelup.gitconnected.com/how-to-add-swagger-ui-to-existing-node-js-and-express-js-project-2c8bad9364ce
// https://levelup.gitconnected.com/generating-swagger-api-docs-and-ui-automatically-for-express-js-apps-2ea1436a0f59
// https://dev.to/kabartolo/how-to-document-an-express-api-with-swagger-ui-and-jsdoc-50do

export default swaggerRouter;
