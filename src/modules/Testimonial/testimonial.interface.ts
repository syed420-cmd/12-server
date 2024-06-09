import { ObjectId } from 'mongoose';

export interface ITestimonial {
  userId: ObjectId; // Reference to the User
  review: string;
  rating: number;
}
