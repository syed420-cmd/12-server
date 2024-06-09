import { ITestimonial } from './testimonial.interface';
import { Testimonial } from './testimonial.model';

const createTestimonialIntoDB = async (payload: ITestimonial) => {
  const result = await Testimonial?.create(payload);
  return result;
};

const getTestimonialsFromDB = async () => {
  const result = await Testimonial?.find()?.populate('userId');
  return result;
};

export const TestimonialServices = {
  createTestimonialIntoDB,
  getTestimonialsFromDB,
};
