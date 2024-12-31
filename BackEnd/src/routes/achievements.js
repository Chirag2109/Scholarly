import express from 'express';
import upload from '../middlewares/achievement_multer.js';
import { addAchievement, getAchievements, getAllAchievements } from '../controllers/achievements.js';

const achievementRouter = express.Router();

// Route for adding achievement
achievementRouter.post('/addachievement', upload.fields([
    { name: 'certificate', maxCount: 1 },
    { name: 'eventImage', maxCount: 10 },
]), addAchievement);

// Route for getting achievements for a specific user
achievementRouter.get('/:username', getAchievements);

// Route for getting all achievements
achievementRouter.get('/', getAllAchievements);

export default achievementRouter;