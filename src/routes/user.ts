import express from 'express';
import authenticate from '../middleware/authenticate';
import profile from '../controllers/user/profile';

const userRouter = express.Router();

userRouter.use(authenticate)
userRouter.get('/profile', profile)

export default userRouter;