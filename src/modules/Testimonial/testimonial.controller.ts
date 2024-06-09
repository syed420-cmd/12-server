import httpStatus from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { TestimonialServices } from './testimonial.service';

const createTestimonial = catchAsync(async (req, res) => {
  const result = await TestimonialServices?.createTestimonialIntoDB(req?.body);

  sendResponse(res, {
    statusCode: httpStatus?.CREATED,
    success: true,
    message: 'Testimonial created successfully!',
    data: result,
  });
});

const getTestimonials = catchAsync(async (req, res) => {
  const result = await TestimonialServices?.getTestimonialsFromDB();

  sendResponse(res, {
    statusCode: httpStatus?.OK,
    success: true,
    message: 'Testimonials retrieved successfully!',
    data: result,
  });
});

export const TestimonialControllers = {
  createTestimonial,
  getTestimonials,
};
