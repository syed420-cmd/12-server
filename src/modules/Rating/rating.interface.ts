import { ObjectId } from 'mongoose';

export interface IRating {
  courseId: ObjectId; // reference to the Course
  userId: ObjectId; // reference to the Course
  rating: number; // rating value, e.g., from 1 to 5
  review: string;
}
