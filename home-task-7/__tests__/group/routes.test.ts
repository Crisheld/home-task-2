import request from "supertest";

import app, { assertDatabaseConnectionOk } from "../../src/app";
import { Group } from "../../src/group/groupModel";
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

  test("create-group", async () => {
    let res = await request(app)
      .post("/group/create")
      .set("authorization", authToken)
      .send({
        name: "group_test",
        permissions: ["READ", "WRITE", "DELETE"],
      });
    expect(res.body).toHaveProperty("message", "group created");
    expect(res.body).toHaveProperty("group.id");
    const group = await Group.findByPk(res.body.id);
    group?.destroy();
  });

  test("update-group", async () => {
    const group = await Group.create({
      name: "group_test",
      permissions: ["READ", "WRITE", "DELETE"],
    });
    let res = await request(app)
      .put(`/group/${group.id}`)
      .set("authorization", authToken)
      .send({
        name: "group_test",
        permissions: ["READ", "WRITE", "DELETE"],
      });
    expect(res.body).toHaveProperty("message", "group updated");
    expect(res.body).toHaveProperty("group.id", group.id);
    group?.destroy();
  });

  test("update-inexistent-group", async () => {
    let res = await request(app)
      .put(`/group/9999`)
      .set("authorization", authToken)
      .send({
        name: "group_test",
        permissions: ["READ", "WRITE", "DELETE"],
      });
    expect(res.body).toHaveProperty("message", "group doesn't exist");
    expect(res.statusCode).toBe(400);
  });

  test("delete-group", async () => {
    const group = await Group.create({
      name: "group_test",
      permissions: ["READ", "WRITE", "DELETE"],
    });
    let res = await request(app)
      .delete(`/group/${group.id}`)
      .set("authorization", authToken)
      .send();
    expect(res.body).toHaveProperty("message", "group deleted");
  });

  test("get-group", async () => {
    const group = await Group.create({
      name: "group_test",
      permissions: ["READ", "WRITE", "DELETE"],
    });
    let res = await request(app)
      .get(`/group/${group.id}`)
      .set("authorization", authToken)
      .send();
    expect(res.body).toHaveProperty("message", "group fetched");
    expect(res.body).toHaveProperty("group.id", group.id);
    group?.destroy();
  });
});
