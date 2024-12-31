import express from 'express';
import Achievement from '../models/achievements.js';
import upload from '../middlewares/achievement_multer.js';

const achievementRouter = express.Router();

achievementRouter.post(
    '/addachievement',
    upload.fields([
        { name: 'certificate', maxCount: 1 },
        { name: 'eventImage', maxCount: 10 },
    ]),
    (req, res) => {
        Achievement.addachievement(req, res);
    }
);

achievementRouter.get('/:username', Achievement.getachievements);
achievementRouter.get('/', Achievement.getAllAchievements);

export default achievementRouter;