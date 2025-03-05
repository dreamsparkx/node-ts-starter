import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app";
import { run as postmanScriptRun } from "../../src/util/postman";

describe("GET /api-docs", () => {
  it("should return 301 Moved Permanently", async () => {
    await request(app).get("/api-docs").expect(301);
  });
});

describe("GET /swagger.json", () => {
  it("should return 200 OK", async () => {
    await request(app)
      .get("/swagger.json")
      .expect(200)
      .expect(function (res) {
        const contentType = res.header["content-type"];
        expect(contentType).toBe("application/json; charset=utf-8");
      });
  });
});

describe("GET /postman.json and check postman script", () => {
  it("should return 200 OK", async () => {
    await request(app)
      .get("/postman.json")
      .expect(200)
      .expect(function (res) {
        const contentType = res.header["content-type"];
        expect(contentType).toBe("application/json; charset=utf-8");
      });
  });
  it("should check postmanScript", async () => {
    await expect(async () => {
      await postmanScriptRun();
    }).not.toThrowError();
  });
});

describe("GET /redoc", () => {
  it("should return 200 OK", async () => {
    await request(app).get("/redoc").expect(200);
  });
});
