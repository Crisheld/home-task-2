import request from "supertest";

import app, { assertDatabaseConnectionOk } from "../../src/app";
import { User } from "../../src/user/userModel";

describe("Test user module", () => {
  let authToken = "";

  beforeAll(async () => {
    await assertDatabaseConnectionOk();
    let res = await request(app).post("/login").send({
      login: "crishelt4",
      password: "asd8",
    });
    expect(res.body).toHaveProperty("token");
    authToken = res.body.token;
  });

  test("create-user", async () => {
    let res = await request(app)
      .post("/user/create")
      .set("authorization", authToken)
      .send({
        login: "test_user",
        password: "asd8",
        age: 27,
      });
    expect(res.body).toHaveProperty("message", "user created");
    expect(res.body).toHaveProperty("user.id");
    const user = await User.findByPk(res.body.user.id);
    user?.destroy();
  });

  test("update-user", async () => {
    const user = await User.create({
      login: "test_user",
      password: "asd8",
      age: 27,
      isDeleted: false,
    });
    let res = await request(app)
      .put(`/user/${user.id}`)
      .set("authorization", authToken)
      .send({
        login: "test_user_updated",
        password: "asd8",
        age: 27,
      });
    expect(res.body).toHaveProperty("message", "user updated");
    expect(res.body).toHaveProperty("user.id", user.id);
    user?.destroy();
  });

  test("update-inexistent-user", async () => {
    let res = await request(app)
      .put(`/user/99999999`)
      .set("authorization", authToken)
      .send({
        login: "test_inexistent",
        password: "asd8",
        age: 27,
      });
    expect(res.body).toHaveProperty("message", "user doesn't exist");
    expect(res.statusCode).toBe(400);
  });

  test("delete-user", async () => {
    const user = await User.create({
      login: "test_user",
      password: "asd8",
      age: 27,
      isDeleted: false,
    });
    let res = await request(app)
      .delete(`/user/${user.id}`)
      .set("authorization", authToken)
      .send();
    expect(res.body).toHaveProperty("message", "user deleted");
    user?.destroy();
  });

  test("get-user", async () => {
    const user = await User.create({
      login: "test_user",
      password: "asd8",
      age: 27,
      isDeleted: false,
    });
    let res = await request(app)
      .get(`/user/${user.id}`)
      .set("authorization", authToken)
      .send();
    expect(res.body).toHaveProperty("message", "user fetched");
    expect(res.body).toHaveProperty("user.id", user.id);
    user?.destroy();
  });
});
