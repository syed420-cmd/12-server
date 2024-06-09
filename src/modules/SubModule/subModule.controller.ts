import httpStatus from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { SubModuleServices } from './subModule.service';

const createModule = catchAsync(async (req, res) => {
  const result = await SubModuleServices?.createSubModuleIntoDB(req?.body);

  sendResponse(res, {
    statusCode: httpStatus?.CREATED,
    success: true,
    message: 'Sub Module created successfully!',
    data: result,
  });
});

export const SubModuleControllers = {
  createModule,
};
