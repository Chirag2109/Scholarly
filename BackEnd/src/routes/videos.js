import express from 'express';
import upload from '../middlewares/video_multer.js';
import Video from '../models/videos.js';
import authenticateToken from '../utils/helper.js';

const videoRouter = express.Router();

// Middleware
videoRouter.use(express.urlencoded({ extended: true }));
videoRouter.use(express.json());

videoRouter.post('/addvideo', upload, (req, res) => {
    Video.addvideo(req, res);
});

// Serve video file
videoRouter.get('/uploads/:username/video/:filename', authenticateToken, Video.getvideo);

export default videoRouter;