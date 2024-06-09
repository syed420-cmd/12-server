import httpStatus from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { CommentServices } from './comment.service';

const createComment = catchAsync(async (req, res) => {
  const result = await CommentServices?.createCommentIntoDB(req?.body);

  sendResponse(res, {
    statusCode: httpStatus?.CREATED,
    success: true,
    message: 'Comment created successfully!',
    data: result,
  });
});

export const CommentControllers = {
  createComment,
};
