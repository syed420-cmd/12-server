import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

// Define the User schema with specific data types and rules
const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures all emails in the database are unique
      lowercase: true, // Automatically converts email to lowercase before saving
      trim: true, // Trims whitespace from both ends of the email before saving
    },
    avatar: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'tutor', 'admin'], // Restricts the role to one of these predefined values
      default: 'student', // Sets default role to 'student' if none is specified
    },
  },
  { timestamps: true },
);

// Custom method to modify the JSON representation of user documents
userSchema.methods.toJSON = function (options: { includeRole?: boolean } = {}) {
  const userObject = this.toObject(); // Converts the Mongoose document into a plain JavaScript object

  if (!options?.includeRole) {
    delete userObject.role; // Remove the role property from the object if not required
  }

  return userObject;
};

// Create and export the User model using the defined schema
export const User = model<IUser>('User', userSchema);
