import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app";
import { generateJWT } from "../../src/util/jwt";

function generateRandomEmail() {
  return `${(Math.random() + 1).toString(36).substring(7)}@gmail.com`;
}

describe("GET /api/user", () => {
  it("should return 406", async () => {
    await request(app).get("/api/user").expect(406);
  });
  it("should return 403", async () => {
    await request(app)
      .get("/api/user")
      .set("Authorization", "Bearer sd")
      .expect(403);
  });
  it("should return 401 as token is generated but not in DB", async () => {
    const tempToken = generateJWT({
      _id: "61f15d96d7204ed64374208a",
      email: "asd@asd.com",
    });
    await request(app)
      .get("/api/user")
      .set("Authorization", `Bearer ${tempToken}`)
      .expect(401);
  });
});

describe("POST PUT DELETE /api/user and login user GET /api/user/login", () => {
  let email = generateRandomEmail();
  let password = "test";
  let token = "";
  it("should return 400", async () => {
    await request(app).post("/api/user").expect(400);
  });
  it("should return 201", async () => {
    await request(app)
      .post("/api/user")
      .send({
        email,
        password,
      })
      .expect(201);
  });
  it("should return 409", async () => {
    await request(app)
      .post("/api/user")
      .send({
        email,
        password,
      })
      .expect(409);
  });
  it("should return 200 for user login", async () => {
    await new Promise((r) => setTimeout(r, 2000));
    const result = await request(app).post("/api/user/login").send({
      email,
      password,
    });
    expect(result.body.token).toBeDefined();
    token = result.body.token;
    expect(result.statusCode).toBe(200);
  }, 10000);
  it("should return 400 for user login failure (wrong password)", async () => {
    await request(app)
      .post("/api/user/login")
      .send({
        email,
        password: "wrong_password",
      })
      .expect(400);
  });
  it("should return 400 for user login failure (wrong email)", async () => {
    await request(app)
      .post("/api/user/login")
      .send({
        email: "wrong_email@email.com",
        password: "wrong_password",
      })
      .expect(400);
  });
  it("should return 400 for user login failure (bad email type)", async () => {
    await request(app)
      .post("/api/user/login")
      .send({
        email: "wrong_email",
        password: "wrong_password",
      })
      .expect(400);
  });
  it("should update user and return 200", async () => {
    email = generateRandomEmail();
    password = "asdbnkajsbdjkqbwelkansdad";
    await request(app)
      .put("/api/user")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email,
        password,
      })
      .expect(200);
  });
  it("should delete user and return 204", async () => {
    await new Promise((r) => setTimeout(r, 2000));
    const result = await request(app).post("/api/user/login").send({
      email,
      password,
    });
    token = result.body.token;
    const endRes = await request(app)
      .delete("/api/user")
      .set("Authorization", `Bearer ${token}`);
    expect(endRes.statusCode).toBe(204);
  }, 10000);
});
