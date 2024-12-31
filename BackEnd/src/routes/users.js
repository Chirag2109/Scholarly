import express from 'express';
import { addUser, getUser, signIn } from '../controllers/users.js';
import authenticateToken from '../utils/helper.js';

const userRouter = express.Router();

userRouter.post('/signup', addUser);
userRouter.post('/signin', signIn);
userRouter.get('/:username', authenticateToken, getUser);

export default userRouter;