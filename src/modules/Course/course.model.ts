import { Schema, model } from 'mongoose';
import { ICourse } from './course.interface';

const courseSchema = new Schema<ICourse>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courseTitle: {
      type: String,
      required: true,
      unique: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    bannerImages: {
      type: [String],
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
    courseDuration: {
      type: String,
      required: true,
    },
    registrationFee: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approve', 'rejected'],
      default: 'pending',
    },
    feedback: {
      type: String,
    },
    rejectionReason: {
      type: String,
    },
    isPaid: {
      type: Boolean,
      required: true,
    },
    certificateAvailability: {
      type: Boolean,
      required: true,
    },
    courseOverviewVideoLink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// method to remove sensitive fields before returning course object as JSON
courseSchema.methods.toJSON = function () {
  const courseObject = this.toObject();
  delete courseObject?.status;
  return courseObject;
};

export const Course = model<ICourse>('Course', courseSchema);
