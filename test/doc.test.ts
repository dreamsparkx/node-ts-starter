import request from "supertest";
import app from "../src/app";

describe("GET /api-docs", () => {
  it("should return 301 Moved Permanently", (done) => {
    request(app).get("/api-docs").expect(301, done);
  });
});

describe("GET /swagger.json", () => {
  it("should return 200 OK", (done) => {
    request(app)
      .get("/swagger.json")
      .expect(200)
      .expect(function (res) {
        const contentType = res.header["content-type"];
        expect(contentType).toBe("application/json; charset=utf-8");
      })
      .end(done);
  });
});

describe("GET /postman.json", () => {
  it("should return 200 OK", (done) => {
    request(app)
      .get("/postman.json")
      .expect(200)
      .expect(function (res) {
        const contentType = res.header["content-type"];
        expect(contentType).toBe("application/json; charset=utf-8");
      })
      .end(done);
  });
});

describe("GET /redoc", () => {
  it("should return 200 OK", (done) => {
    request(app).get("/redoc").expect(200, done);
  });
});
