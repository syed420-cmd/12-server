import { Schema, model } from 'mongoose';
import { IComment } from './comment.interface';

const commentSchema = new Schema<IComment>(
  {
    subModuleId: {
      type: Schema?.Types?.ObjectId,
      ref: 'SubModule',
      required: true,
    },
    userId: {
      type: Schema?.Types?.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Comment = model<IComment>('Comment', commentSchema);
