import express from "express";
import {
  bookSession,
  createReview,
  createSession,
  deleteSession,
  getBookedSessions,
  getClassmates,
  getSessionById,
  getSessions,
  updateSession,
} from "../controllers/session.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// POST /sessions - Create a new session
router.post("/", verifyToken, createSession);
router.get("/", getSessions);
router.get("/:id", getSessionById);
router.put("/:id", verifyToken, updateSession);
router.delete("/:id", verifyToken, deleteSession);
router.post("/:id/review", verifyToken, createReview);
router.post("/:id/book", verifyToken, bookSession);
router.get("/book/approved", verifyToken, getBookedSessions);
router.get("/book/classmates", verifyToken, getClassmates);

export default router;
