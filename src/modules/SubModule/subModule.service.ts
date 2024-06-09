import { SubModule } from './subModule.model';
import { ISubModule } from './subModule.interface';
import { Module } from '../Module/module.model';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const createSubModuleIntoDB = async (payload: ISubModule) => {
  const moduleExists = await Module.findById(payload?.moduleId);
  if (!moduleExists) {
    throw new ApiError(httpStatus?.NOT_FOUND, 'Module Not Found!');
  }

  const result = await SubModule?.create(payload);
  return result;
};

export const SubModuleServices = {
  createSubModuleIntoDB,
};
