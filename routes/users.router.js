import express from "express";

import {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";

const router = express.Router();

router.route("/").get(getUsers).post(addUser);
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

export default router;
