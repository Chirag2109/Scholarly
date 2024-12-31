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

videoRouter.get('/', Video.getAllVideos);

videoRouter.get('/:username', Video.getvideos);

videoRouter.get('/:username/:filename', Video.getvideo);

export default videoRouter;