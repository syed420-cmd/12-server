import mongoose from 'mongoose';
import httpStatus from 'http-status';
import {
  IErrorSources,
  IGenericErrorResponse,
} from '../interface/error.interface';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errorSources: IErrorSources[] = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  return {
    statusCode: httpStatus?.BAD_REQUEST,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;
