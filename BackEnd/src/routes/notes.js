import express from 'express';
import Note from '../models/notes.js';
import authenticateToken from '../utils/helper.js';
import upload from '../middlewares/video_multer.js';

const notesRouter = express.Router();

notesRouter.post('/addnote', authenticateToken, Note.addnotes);

notesRouter.get('/getnotes', authenticateToken, Note.getnotes);

export default notesRouter;