import httpStatus from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { RatingServices } from './rating.service';

const createRating = catchAsync(async (req, res) => {
  const result = await RatingServices?.createRatingIntoDB(req?.body);

  sendResponse(res, {
    statusCode: httpStatus?.CREATED,
    success: true,
    message: 'Rating created successfully!',
    data: result,
  });
});

export const RatingControllers = {
  createRating,
};
