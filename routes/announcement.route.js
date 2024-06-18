import express from "express";
import {
  createAnnouncement,
  getAnnouncements,
} from "../controllers/announcement.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/", verifyToken, createAnnouncement);
router.get("/", getAnnouncements);

export default router;
