import { ObjectId } from 'mongoose';

export interface IComment {
  subModuleId: ObjectId; // Reference to the SubModule
  userId: ObjectId; // Reference to the User
  comment: string;
}
