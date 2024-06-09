import httpStatus from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices?.createCourseIntoDB(req?.body);

  sendResponse(res, {
    statusCode: httpStatus?.CREATED,
    success: true,
    message: 'Course created successfully!',
    data: result,
  });
});

const getCourses = catchAsync(async (req, res) => {
  const result = await CourseServices?.getCoursesFromDB();

  sendResponse(res, {
    statusCode: httpStatus?.OK,
    success: true,
    message: 'Course retrieved successfully!',
    data: result,
  });
});

const getCourseDetails = catchAsync(async (req, res) => {
  const result = await CourseServices?.getCourseDetailsFromDB(
    req?.params?.courseId,
  );

  sendResponse(res, {
    statusCode: httpStatus?.OK,
    success: true,
    message: 'Course details retrieved successfully!',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getCourses,
  getCourseDetails,
};
