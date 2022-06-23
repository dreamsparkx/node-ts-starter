import express from "express";
import * as userController from "../controllers/user";
import * as userControllerValidators from "../controllers/user/validators";
import * as authenticateMiddleware from "../middlewares/authenticate";

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *  - name: user
 *    description: all the user's apis
 *  - name: jwt_user_model
 *    x-displayName: JWT User
 *    description: <SchemaDefinition schemaRef="#/components/schemas/JWTUser" />
 *  - name: generic_result
 *    x-displayName: Generic Result
 *    description: <SchemaDefinition schemaRef="#/components/schemas/GenericResult" />
 * components:
 *  schemas:
 *      JWTUser:
 *          type: object
 *          properties:
 *              _id:
 *                type: string
 *                example: 61f15d96d7204ed64374208a
 *              email:
 *                type: string
 *                example: asd@asd.com
 *              iat:
 *                type: integer
 *                example: 1643211146
 *              exp:
 *                type: integer
 *                example: 1643212946
 *      UserLoginResult:
 *          type: object
 *          properties:
 *              token:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWYxNWQ5NmQ3MjA0ZWQ2NDM3NDIwOGEiLCJlbWFpbCI6ImFzZEBhc2QuY29tIiwiaWF0IjoxNjQzMjExODc1LCJleHAiOjE2NDMyMTM2NzV9.Faw6pvYYdf_eP3SLjcT3O8FesI35Celpj8IVsTXyQCE
 * /api/user:
 *  get:
 *    summary: Get Current User Details
 *    description: Get Current User Details
 *    tags:
 *      - user
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      403:
 *        description: Forbidden Request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GenericResult'
 *      406:
 *        description: Incorrect Headers
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GenericResult'
 *      200:
 *        description: User Details
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  $ref: '#/components/schemas/JWTUser'
 *  post:
 *    summary: Create User
 *    description: Create User
 *    tags:
 *      - user
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      400:
 *        description: Validation Error or bad Request.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GenericResult'
 *      409:
 *        description: User Already exists.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GenericResult'
 *      201:
 *        description: User Registered.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GenericResult'
 *  delete:
 *    summary: Delete User
 *    description: Delete User
 *    tags:
 *      - user
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      401:
 *        description: Forbidden Request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GenericResult'
 *      403:
 *        description: Forbidden Request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GenericResult'
 *      406:
 *        description: Incorrect Headers
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GenericResult'
 *      204:
 *        description: Successfully Deleted User
 */
userRouter.get(
  "/",
  authenticateMiddleware.authenticateToken,
  userController.getCurrentUser,
);
userRouter.post(
  "/",
  userControllerValidators.createUser,
  userController.createUser,
);
userRouter.delete(
  "/",
  authenticateMiddleware.authenticateToken,
  authenticateMiddleware.authenticateUser,
  userController.deleteUser,
);
/**
 * @swagger
 * /api/user/login:
 *  post:
 *    summary: Login User
 *    description: Login User
 *    tags:
 *      - user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      400:
 *        description: Validation Error.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GenericResult'
 *      200:
 *        description: Successfull Login
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserLoginResult'
 *      401:
 *        description: Invalid password.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GenericResult'
 */
userRouter.post(
  "/login",
  userControllerValidators.loginUser,
  userController.loginUser,
);

export default userRouter;
