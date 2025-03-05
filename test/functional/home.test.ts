import { describe, it } from "vitest";
import request from "supertest";
import app from "../../src/app";

describe("GET /", () => {
  it("should return 200 OK", async () => {
    await request(app).get("/").expect(200);
  });
});
