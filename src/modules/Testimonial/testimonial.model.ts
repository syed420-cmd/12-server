import { Schema, model } from 'mongoose';
import { ITestimonial } from './testimonial.interface';

// define the Testimonial schema
const testimonialSchema = new Schema<ITestimonial>(
  {
    userId: {
      type: Schema?.Types?.ObjectId, // reference to a User
      ref: 'User', // reference to the User model
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1, // minimum value for rating
      max: 5, // maximum value for rating
    },
  },
  { timestamps: true },
);

// create the Testimonial model using the schema
export const Testimonial = model<ITestimonial>(
  'Testimonial',
  testimonialSchema,
);
