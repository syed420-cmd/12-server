import { ObjectId } from 'mongoose';

export interface IModule {
  courseId: ObjectId; // Reference to the Course
  moduleTitle: string;
  moduleDescription: string;
}
