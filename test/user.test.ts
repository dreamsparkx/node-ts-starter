import request from "supertest";
import app from "../src/app";
import { generateJWT } from "../src/util/jwt";

describe("GET /api/user", () => {
  it("should return 406", (done) => {
    request(app).get("/api/user").expect(406, done);
  });
  it("should return 403", (done) => {
    request(app)
      .get("/api/user")
      .set("Authorization", "Bearer sd")
      .expect(403, done);
  });
  it("should return 200", (done) => {
    const tempToken = generateJWT({
      _id: "61f15d96d7204ed64374208a",
      email: "asd@asd.com",
    });
    request(app)
      .get("/api/user")
      .set("Authorization", `Bearer ${tempToken}`)
      .expect(200, done);
  });
});
