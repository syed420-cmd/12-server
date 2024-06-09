import { Schema, model } from 'mongoose';
import { ISubModule } from './subModule.interface';

const subModuleSchema = new Schema<ISubModule>(
  {
    moduleId: {
      type: Schema?.Types?.ObjectId,
      ref: 'Module',
      required: true,
    },
    subModuleNum: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: [String],
    },
    videoUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

export const SubModule = model<ISubModule>('SubModule', subModuleSchema);
