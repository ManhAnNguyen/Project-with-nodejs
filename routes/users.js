import express from "express";
import {
  getAllUsers,
  createUser,
  getDetailUser,
  deleteUser,
  updateUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getAllUsers);

router.post("/", createUser);

router.get("/:id", getDetailUser);

router.delete("/:id", deleteUser);

router.put("/:id", updateUser);

export default router;
