import { ObjectId } from 'mongoose';

export interface INote {
  userId: ObjectId; // reference to the User
  title: string;
  description: string;
  priority: string;
}
