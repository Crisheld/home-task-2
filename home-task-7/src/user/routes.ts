import express from "express";
import { create, deleteById, getAutoSuggestUsers, getById, update } from "./controller";
import { userValidator } from "./validator";

const router = express.Router();


router.get("/:userId", getById);
router.delete("/:userId", deleteById);
router.post("/create", userValidator, create);
router.put("/:userId", userValidator, update);
router.get("/list/:loginSubstring/:limit", getAutoSuggestUsers);

export default router;
