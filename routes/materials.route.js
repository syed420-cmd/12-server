// routes/materials.js

import express from "express";
import {
  createMaterial,
  deleteMaterial,
  getMaterials,
  updateMaterial,
} from "../controllers/material.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/", verifyToken, createMaterial);
router.get("/", verifyToken, getMaterials);
router.put("/:id", verifyToken, updateMaterial);
router.delete("/:id", verifyToken, deleteMaterial);

export default router;
