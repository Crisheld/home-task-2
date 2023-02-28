import express from "express";
import { create, deleteById, getAll, getById, update, addUsersToGroup } from "./controller";

const router = express.Router();

router.get("/list", getAll);
router.get("/:groupId", getById);
router.delete("/:groupId", deleteById);
router.post("/create", create);
router.put("/:groupId",  update);
router.post("/:groupId/add_users",  addUsersToGroup);

export default router;
