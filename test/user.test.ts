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

describe("POST DELETE /api/user and login user GET /api/user/login", () => {
  const email = `${(Math.random() + 1)
    .toString(36)
    .substring(7)}@gmail.com`;
  const password = "test";
  let token = "";
  it("should return 400", (done) => {
    request(app).post("/api/user").expect(400, done);
  });
  it("should return 201", (done) => {
    request(app)
      .post("/api/user")
      .send({
        email,
        password,
      })
      .expect(201, done);
  });
  it("should return 409", (done) => {
    request(app)
      .post("/api/user")
      .send({
        email,
        password,
      })
      .expect(409, done);
  });
  it("should return 200 for user login", (done) => {
    request(app)
      .post("/api/user/login")
      .send({
        email,
        password,
      })
      .expect((res) => {
        expect(res.body.token).toBeDefined();
        token = res.body.token;
      })
      .expect(200, done);
  });
  it("should return 400 for user login failure (wrong password)", (done) => {
    request(app)
      .post("/api/user/login")
      .send({
        email,
        password: "wrong_password",
      })
      .expect(400, done);
  });
  it("should return 400 for user login failure (wrong email)", (done) => {
    request(app)
      .post("/api/user/login")
      .send({
        email: "wrong_email@email.com",
        password: "wrong_password",
      })
      .expect(400, done);
  });
  it("should return 400 for user login failure (bad email type)", (done) => {
    request(app)
      .post("/api/user/login")
      .send({
        email: "wrong_email",
        password: "wrong_password",
      })
      .expect(400, done);
  });
  it("should delete user and return 204", (done) => {
    request(app)
      .delete("/api/user")
      .set("Authorization", `Bearer ${token}`)
      .expect(204, done);
  });
});
