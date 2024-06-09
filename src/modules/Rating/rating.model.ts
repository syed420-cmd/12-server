import { Schema, model } from 'mongoose';
import { IRating } from './rating.interface';

const ratingSchema = new Schema<IRating>(
  {
    courseId: {
      type: Schema?.Types?.ObjectId,
      ref: 'Course',
      required: true,
    },
    userId: {
      type: Schema?.Types?.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Rating = model<IRating>('Rating', ratingSchema);
