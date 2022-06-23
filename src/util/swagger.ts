import SwaggerJSDoc, {
  SwaggerDefinition,
  Options,
} from "swagger-jsdoc";
import { PORT } from "./secrets";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "node-ts-starter Swagger API",
    version: "1.0.0",
    description:
      "This is a simple CRUD API application made with Express and documented with Swagger",
    license: {
      name: "MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "dreamsparkx",
    },
  },
  host: `localhost:${PORT}`,
  schemes: ["http", "https"],
  components: {
    securitySchemes: {
      bearerAuth: {
        // arbitrary name for the security scheme
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  "x-tagGroups": [
    {
      name: "User Management",
      tags: ["user"],
    },
    {
      name: "Models",
      tags: ["jwt_user_model", "generic_result"],
    },
  ],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
};

const options: Options = {
  swaggerDefinition,
  apis: ["./dist/**/*.js"],
};

export const specs = SwaggerJSDoc(options);
