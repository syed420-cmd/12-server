import mongoose from "mongoose";

const sessionBookSchema = new mongoose.Schema(
  {
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const SessionBook = mongoose.model("SessionBook", sessionBookSchema);

export default SessionBook;
