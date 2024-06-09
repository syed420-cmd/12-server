import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { COURSE_STATUS } from './course.constant';
import { ICourse } from './course.interface';
import { Course } from './course.model';
import { User } from '../User/user.model';

const createCourseIntoDB = async (payload: ICourse) => {
  // Verify User Existence
  const existingUser = await User.findById(payload?.userId);
  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found!');
  }

  // Enforce status to be pending
  payload.status = COURSE_STATUS.pending;

  const result = await Course?.create(payload);
  return result;
};

const getCoursesFromDB = async () => {
  const result = await Course?.find()?.populate({
    path: 'userId',
    select: '-role', // exclude the role field
  });
  return result;
};

const getCourseDetailsFromDB = async (courseId: string) => {
  // Verify Course Existence
  const courseExists = await Course.findById(courseId);
  if (!courseExists) {
    throw new ApiError(httpStatus?.NOT_FOUND, 'Course Not Found');
  }

  // Aggregate to get course details including modules and submodules
  const result = await Course.aggregate([
    {
      $lookup: {
        from: 'modules',
        localField: '_id',
        foreignField: 'courseId',
        as: 'modules',
        pipeline: [
          // Lookup submodules for each module
          {
            $lookup: {
              from: 'submodules',
              localField: '_id',
              foreignField: 'moduleId',
              as: 'submodules',
            },
          },
        ],
      },
    },
  ]);

  return result[0];
};

export const CourseServices = {
  createCourseIntoDB,
  getCoursesFromDB,
  getCourseDetailsFromDB,
};
