import express from 'express';
import User from '../models/users';
import authenticateToken from '../utils/helper';

const userRouter = express.Router();

userRouter.post("/", (req, res) => {
    User.adduser(req, res);
});

userRouter.get("/:email", authenticateToken, (req, res) => {
    User.getuser(req, res);
});

userRouter.post("/signin", (req, res) => {
    User.signin(req, res);
});

export default userRouter;