import { ObjectId } from 'mongoose';

export interface ISubModule {
  moduleId: ObjectId; // Reference to the Module
  subModuleNum: number;
  title: string;
  imageUrls?: string[];
  videoUrl: string;
  description?: string;
}
