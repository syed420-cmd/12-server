import mongoose from 'mongoose';
import httpStatus from 'http-status';
import {
  IErrorSources,
  IGenericErrorResponse,
} from '../interface/error.interface';

const handleCastError = (
  err: mongoose.Error.CastError,
): IGenericErrorResponse => {
  const errorSources: IErrorSources[] = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  return {
    statusCode: httpStatus?.BAD_REQUEST,
    message: httpStatus['400_MESSAGE'],
    errorSources,
  };
};

export default handleCastError;
