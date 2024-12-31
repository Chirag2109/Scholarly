import express from 'express';
import upload from '../middlewares/video_multer.js';
import {
    addVideo,
    getVideosByUser,
    getAllVideos,
    getVideoByFilename,
} from '../controllers/videos.js';

const videoRouter = express.Router();

// Middleware
videoRouter.use(express.urlencoded({ extended: true }));
videoRouter.use(express.json());

videoRouter.post('/addvideo', upload, (req, res) => {
    addVideo;
});

videoRouter.get('/', getAllVideos);

videoRouter.get('/:username', getVideosByUser);

videoRouter.get('/:username/:filename', getVideoByFilename);

export default videoRouter;