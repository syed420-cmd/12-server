import httpStatus from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { NoteServices } from './note.service';

const createNote = catchAsync(async (req, res) => {
  const result = await NoteServices.createNoteIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Note created successfully!',
    data: result,
  });
});

const getNotes = catchAsync(async (req, res) => {
  const result = await NoteServices.getNotesFromDB(req.params?.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notes retrieved successfully!',
    data: result,
  });
});

const updateNote = catchAsync(async (req, res) => {
  const { noteId } = req.params;
  const payload = req.body;

  const result = await NoteServices.updateNoteIntoDB(noteId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Note updated successfully!',
    data: result,
  });
});

const deleteNote = catchAsync(async (req, res) => {
  const { userId, noteId } = req.params;
  const result = await NoteServices.deleteNoteFromDB(userId, noteId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Note deleted successfully!',
    data: result,
  });
});

export const NoteControllers = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
};
