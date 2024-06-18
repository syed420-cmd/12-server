// models/Material.js

import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },
    tutorEmail: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    googleDriveLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Material = mongoose.model("Material", materialSchema);

export default Material;
