import express from 'express';
import Photos from '../models/profilepic.js';
import authenticateToken from '../utils/helper.js';
import upload from '../middlewares/photo_multer.js';

const photoRouter = express.Router();

photoRouter.post('/addprofilepic', upload, (req, res) => {
    Photos.addprofilepic(req, res);
});

photoRouter.get('/getprofilepic', (req, res) => {
    return res.status(404).json({ message: 'Profile picture not found.' });
});

// photoRouter.get('/getnote', authenticateToken, Notes.getnote);

export default photoRouter;