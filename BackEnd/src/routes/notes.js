import express from 'express';
import Notes from '../models/notes.js';
import authenticateToken from '../utils/helper.js';
import upload from '../middlewares/note_multer.js';

const notesRouter = express.Router();

notesRouter.post('/addnote', upload, (req, res) => {
    Notes.addnote(req, res);
});

notesRouter.get('/:username', Notes.getnotes);

export default notesRouter;