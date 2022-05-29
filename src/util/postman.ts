/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";
import Converter from "openapi-to-postmanv2";
import { specs } from "./swagger";

Converter.convert(
  { type: "json", data: specs },
  {},
  (
    err: Error,
    result: {
      result: boolean;
      output: any;
    },
  ) => {
    if (err) {
      throw err;
    }
    if (!result.result) {
      throw new Error("Could not create json: " + result.output);
    }
    fs.writeFile(
      path.resolve(__dirname + "/../..") + "/postman_collection.json",
      JSON.stringify(result.output[0].data),
      (err) => {
        if (err) {
          throw err;
        }
        console.log("Postman collection created.");
      },
    );
  },
);
