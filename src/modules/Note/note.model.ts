import { Schema, model } from 'mongoose';
import { INote } from './note.interface';

const NoteSchema = new Schema<INote>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Note = model<INote>('Note', NoteSchema);
