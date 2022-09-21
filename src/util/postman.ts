/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";
import Converter from "openapi-to-postmanv2";
import { specs } from "./swagger";

function getPostmanJSON() {
  return new Promise((resolve, reject) => {
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
          reject(err);
        }
        if (!result.result) {
          reject(
            new Error("Could not create json: " + result.output),
          );
        }
        resolve(result.output[0].data);
      },
    );
  });
}

async function run() {
  const data = await getPostmanJSON();
  fs.writeFile(
    path.resolve(__dirname + "/../..") + "/postman_collection.json",
    JSON.stringify(data),
    (err) => {
      if (err) {
        throw err;
      }
      console.log("Postman collection created.");
    },
  );
}

export { getPostmanJSON, run };
