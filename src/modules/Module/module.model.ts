import { Schema, model } from 'mongoose';
import { IModule } from './module.interface';

const moduleSchema = new Schema<IModule>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    moduleTitle: {
      type: String,
      required: true,
    },
    moduleDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Module = model<IModule>('Module', moduleSchema);
