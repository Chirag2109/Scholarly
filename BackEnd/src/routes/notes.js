import express from 'express';
import { addNote, getNotes } from '../controllers/notes.js';
import authenticateToken from '../utils/helper.js';
import upload from '../middlewares/note_multer.js';

const notesRouter = express.Router();

// Route for adding notes
notesRouter.post('/addnote', upload, addNote);

// Route for getting notes for a specific user
notesRouter.get('/:username', authenticateToken, getNotes);

export default notesRouter;