import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { User } from '../User/user.model';
import { INote } from './note.interface';
import { Note } from './note.model';

const createNoteIntoDB = async (payload: INote) => {
  // Verify User Existence
  const existingUser = await User.findById(payload?.userId);
  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found!');
  }

  const result = await Note.create(payload);
  return result;
};

const getNotesFromDB = async (userId: string) => {
  // Verify User Existence
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found!');
  }

  const result = await Note.find({ userId });
  return result;
};

const updateNoteIntoDB = async (noteId: string, payload: Partial<INote>) => {
  // Exclude userId from payload
  const { userId, ...updateData } = payload;

  // Verify User Existence
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found!');
  }

  // Verify Note Existence
  const existingNote = await Note.findById(noteId);
  if (!existingNote) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note Not Found!');
  }

  // // Check if the note belongs to the user
  // if (existingNote?.userId !== userId) {
  //   throw new ApiError(httpStatus.FORBIDDEN, 'Permission denied!');
  // }

  const result = await Note.findByIdAndUpdate(noteId, updateData, {
    new: true,
  });
  return result;
};

const deleteNoteFromDB = async (userId: string, noteId: string) => {
  // Verify User Existence
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found!');
  }

  // Verify Note Existence
  const existingNote = await Note.findById(noteId);
  if (!existingNote) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note Not Found!');
  }

  // // Check if the note belongs to the user
  // if (existingNote.userId?.toString() !== userId) {
  //   throw new ApiError(httpStatus.FORBIDDEN, 'Permission denied!');
  // }

  const result = await Note.findByIdAndDelete(noteId);
  return result;
};

export const NoteServices = {
  createNoteIntoDB,
  getNotesFromDB,
  updateNoteIntoDB,
  deleteNoteFromDB,
};
