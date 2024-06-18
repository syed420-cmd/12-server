import express from "express";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from "../controllers/note.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.route("/").post(verifyToken, createNote).get(verifyToken, getNotes);

router
  .route("/:id")
  .get(verifyToken, getNoteById)
  .put(verifyToken, updateNote)
  .delete(verifyToken, deleteNote);

export default router;
