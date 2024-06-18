import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  signout,
  test,
  tutorUsers,
  updateUser,
  userByEmail,
  whoami,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/whoami", verifyToken, whoami);
router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signout);
router.get("/getusers", verifyToken, getUsers);
router.get("/:userId", getUser);
router.get("/all/tutors", tutorUsers);
router.post("/single-user", userByEmail);

export default router;
