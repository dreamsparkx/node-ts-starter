import express from "express";
import * as homeController from "../controllers/home";
import docsRoutes from "./docs";
import apiRouter from "./api";

const rootRouter = express.Router();
/**
 * @swagger
 * components:
 *  schemas:
 *      GenericResult:
 *          type: object
 *          properties:
 *              error:
 *                  type: boolean
 *                  example: false
 *              errors:
 *                  type: array
 *                  items:
 *                      type: object
 *              message:
 *                  type: string
 */
rootRouter.get("/", homeController.index);
rootRouter.use(docsRoutes);
rootRouter.use("/api", apiRouter);

export default rootRouter;
