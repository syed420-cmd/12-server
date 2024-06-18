import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/ddszzpmvy/image/upload/v1716908110/blog/profile/wsq0r6v4ajbyxvxrgqf6.png",
    },
    role: {
      type: String,
      enum: ["student", "admin", "tutor"],
      default: "student",
    },
    expertise: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
