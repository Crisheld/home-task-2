import request from "supertest";

import app, { assertDatabaseConnectionOk } from "../src/app";

describe("Test app module", () => {
  beforeAll(async () => {
    await assertDatabaseConnectionOk();
  });

  test("login-user", async () => {
    const res = await request(app).post("/login").send({
      login: "crishelt4",
      password: "asd8",
    });
    expect(res.body).toHaveProperty("message", "user logged in");
    expect(res.body).toHaveProperty("token");
  });
});
