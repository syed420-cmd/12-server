/* eslint-disable no-unused-vars */

import jwt, { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

type TCallBack = (err: Error | null, decoded?: JwtPayload) => void;

export const createToken = (
  jwtPayload: { userId: Types.ObjectId; email: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string, cb: TCallBack) => {
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return cb(err);
    }
    cb(null, decoded as JwtPayload);
  });
};
