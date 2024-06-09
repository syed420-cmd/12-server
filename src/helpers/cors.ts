import { CorsOptions } from 'cors';
import ApiError from '../errors/ApiError';
import httpStatus from 'http-status';

// whitelist of allowed origins for CORS
const whitelist = ['http://localhost:5173', 'https://edu-fusion.netlify.app'];

// CORS options to allow requests only from whitelisted origins
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (whitelist?.indexOf(origin as string) !== -1) {
      callback(null, true); // Allow request
    } else {
      callback(
        new ApiError(
          httpStatus?.FORBIDDEN,
          'CORS request strictly prohibited from this origin',
        ),
      ); // Deny request
    }
  },
};

export default corsOptions;
