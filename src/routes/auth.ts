import express from 'express';
import login from '../controllers/auth/login';
import refreshAccessToken from '../controllers/auth/refreshAccessToken';

const authRouter = express.Router();

authRouter.post('/user', login);
authRouter.post('/token/refresh', refreshAccessToken);

export default authRouter;