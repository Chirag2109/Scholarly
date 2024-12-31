import express from 'express';
import { addProfilePic } from '../controllers/profilepic.js';
import upload from '../middlewares/photo_multer.js';

const photoRouter = express.Router();

photoRouter.post('/addprofilepic', upload, (req, res) => {
    addProfilePic
});

export default photoRouter;