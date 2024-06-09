import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { USER_ROLE, UserSearchableFields } from './user.constant';
import { createToken } from '../../helpers/jwt';
import config from '../../config';
import QueryBuilder from '../../builder/QueryBuilder';

const createUserIntoDB = async (payload: IUser) => {
  // Define the allowed roles for user creation
  const allowedRoles = [USER_ROLE.student, USER_ROLE.tutor, USER_ROLE.admin];

  // Set default role to 'student' if no role is provided in the payload
  if (!payload?.role) {
    payload.role = USER_ROLE.student;
  }

  // Validate the provided role against the allowed roles
  if (!allowedRoles?.includes(payload?.role)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid role!');
  }

  // Disallow the creation of users with the 'admin' role through this route for security reasons
  if (payload?.role === 'admin') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Admin creation not allowed!');
  }

  // Check if a user with the same email already exists in the database to avoid duplicates
  const existingUser = await User.findOne({ email: payload?.email });
  if (existingUser) {
    throw new ApiError(httpStatus.CONFLICT, 'User already exists!');
  }

  // Create a new user with the validated payload
  const result = await User.create(payload);
  return result;
};

const createJwtTokenIntoDB = async (email: string) => {
  // Find the user by email in the database If the user is not found, throw a 'Not Found' error
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Prepare the payload for JWT which includes user's email and role
  const jwtPayload = {
    userId: existingUser?._id,
    email: existingUser?.email,
    role: existingUser?.role,
  };

  // Check if JWT configuration is correctly loaded
  if (!config.jwtAccessSecret || !config.jwtAccessExpiresIn) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'JWT configuration is not properly set up!',
    );
  }

  // Generate the JWT access token using the prepared payload and configurations
  const accessToken = createToken(
    jwtPayload,
    config?.jwtAccessSecret, // The secret key for JWT signing
    config?.jwtAccessExpiresIn, // Token expiration setting
  );

  // Return the access token
  return {
    accessToken,
  };
};

const getUsersFromDB = async (query: Record<string, unknown>) => {
  // Define the options to pass to the toJSON method
  const options = { includeRole: true };

  // Build the query using QueryBuilder with the given query parameters
  const usersQuery = new QueryBuilder(User.find(), query)
    .search(UserSearchableFields)
    .sort()
    .paginate()
    .fields();

  // Execute the query to get the results
  const users = await usersQuery?.modelQuery;

  // Manually call toJSON with options on each user document to apply transformations
  const transformedUsers = users?.map((user) => user?.toJSON(options));

  return transformedUsers;
};

const updateUserRoleFromDB = async (
  userId: string,
  payload: { role: keyof typeof USER_ROLE },
) => {
  // Define the allowed roles for user creation
  const allowedRoles = [USER_ROLE.student, USER_ROLE.tutor, USER_ROLE.admin];

  // Set default role to 'student' if no role is provided in the payload
  if (!payload?.role) {
    payload.role = USER_ROLE.student;
  }

  // Validate the provided role against the allowed roles
  if (!allowedRoles?.includes(payload?.role)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid role!');
  }

  const result = User.findByIdAndUpdate(userId, { role: payload?.role });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  createJwtTokenIntoDB,
  getUsersFromDB,
  updateUserRoleFromDB,
};
