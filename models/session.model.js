import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    sessionTitle: {
      type: String,
      required: true,
    },
    tutorName: {
      type: String,
      required: true,
    },
    tutorEmail: {
      type: String,
      required: true,
    },
    sessionDescription: {
      type: String,
      required: true,
    },
    registrationStartDate: {
      type: Date,
      required: true,
    },
    registrationEndDate: {
      type: Date,
      required: true,
    },
    classStartDate: {
      type: Date,
      required: true,
    },
    classEndDate: {
      type: Date,
      required: true,
    },
    sessionDuration: {
      type: Number,
      required: true,
    },
    registrationFee: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    rejectReason: {
      type: String,
    },
    feedback: {
      type: String,
    },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;
