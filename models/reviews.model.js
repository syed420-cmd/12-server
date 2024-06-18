import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
    },
  },
  {
    timestamps: true,
  }
);
const review = mongoose.model("Review", reviewSchema);

export default review;
