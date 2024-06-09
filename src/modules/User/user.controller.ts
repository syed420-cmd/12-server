import httpStatus from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices?.createUserIntoDB(req?.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});

const createJwtToken = catchAsync(async (req, res) => {
  const { email } = req.body;

  const result = await UserServices?.createJwtTokenIntoDB(email);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Token created successfully!',
    data: result,
  });
});

const getUsers = catchAsync(async (req, res) => {
  const result = await UserServices?.getUsersFromDB(req?.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User list retrieved successfully!',
    data: result,
  });
});

const updateUserRole = catchAsync(async (req, res) => {
  const result = await UserServices?.updateUserRoleFromDB(
    req?.params?.userId,
    req?.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User role updated successfully!',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  createJwtToken,
  getUsers,
  updateUserRole,
};
