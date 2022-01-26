import express from "express";
import * as homeController from "../controllers/home";
import swaggerRoutes from "./swagger";
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
rootRouter.use(swaggerRoutes);
rootRouter.use("/api", apiRouter);

export default rootRouter;
