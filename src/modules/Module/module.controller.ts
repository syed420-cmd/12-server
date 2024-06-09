import httpStatus from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { ModuleServices } from './module.service';

const createModule = catchAsync(async (req, res) => {
  const result = await ModuleServices?.createModuleIntoDB(req?.body);

  sendResponse(res, {
    statusCode: httpStatus?.CREATED,
    success: true,
    message: 'Module created successfully!',
    data: result,
  });
});

export const ModuleControllers = {
  createModule,
};
