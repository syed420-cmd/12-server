/* eslint-disable no-unused-vars */

export interface IUser {
  fullName: string;
  email: string;
  role: 'student' | 'tutor' | 'admin';
  avatar: string;
  toJSON(options?: { includeRole?: boolean }): IUser;
}
