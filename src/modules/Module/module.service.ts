import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { Course } from '../Course/course.model';
import { IModule } from './module.interface';
import { Module } from './module.model';

const createModuleIntoDB = async (payload: IModule) => {
  const courseExists = await Course.findById(payload?.courseId);
  if (!courseExists) {
    throw new ApiError(httpStatus?.NOT_FOUND, 'Course Not Found');
  }

  const result = await Module?.create(payload);
  return result;
};

export const ModuleServices = {
  createModuleIntoDB,
};
