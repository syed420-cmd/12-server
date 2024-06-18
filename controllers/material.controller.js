// controllers/materialController.js

import Material from "../models/material.model.js";
import { uploadImage } from "../utils/cloudinary.js";
export const createMaterial = async (req, res) => {
  const { title, sessionId, tutorEmail, googleDriveLink } = req.body;
  if (!title || !sessionId || !tutorEmail || !googleDriveLink) {
    return res.status(400).send({ message: "Missing required fields" });
  }
  const imageUrl = await uploadImage(req.body.image);
  if (!imageUrl) {
    return res.status(400).send({ message: "Failed to upload image" });
  }
  const material = new Material({
    title,
    sessionId,
    tutorEmail,
    imageUrl,
    googleDriveLink,
  });

  try {
    await material.save();
    res.status(201).send(material);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getMaterials = async (req, res) => {
  try {
    if (req.query.tutorEmail) {
      const materials = await Material.find({
        tutorEmail: req.query.tutorEmail,
      });
      return res.status(200).send(materials);
    }
    const materials = await Material.find();
    res.status(200).send(materials);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!material) {
      return res.status(404).send();
    }
    res.status(200).send(material);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material) {
      return res.status(404).send();
    }
    res.status(200).send(material);
  } catch (error) {
    res.status(500).send(error);
  }
};
