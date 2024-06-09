import httpStatus from 'http-status';
import { ZodError, ZodIssue } from 'zod';
import {
  IErrorSources,
  IGenericErrorResponse,
} from '../interface/error.interface';

const handleZodError = (err: ZodError): IGenericErrorResponse => {
  const errorSources: IErrorSources[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path?.length - 1],
      message: issue?.message,
    };
  });

  return {
    statusCode: httpStatus?.BAD_REQUEST,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;
