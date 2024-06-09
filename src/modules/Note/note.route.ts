import { Router } from 'express';
import { NoteControllers } from './note.controller';

const router = Router();

router.get('/:userId', NoteControllers.getNotes);
router.post('/create-note', NoteControllers.createNote);
router.patch('/update-note/:noteId', NoteControllers.updateNote);
router.delete('/delete-note/:userId/:noteId', NoteControllers.deleteNote);

export const NoteRoutes = router;
