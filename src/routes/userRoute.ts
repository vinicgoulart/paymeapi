import express from 'express';
import { Destroy, UpdateUsername, Index } from '../controllers/userController';
import { verifyAuth } from '../middlewares/verifyauthMiddleware';

const router = express.Router();

router.get('/', verifyAuth, Index);

router.delete('/destroy/:username', verifyAuth, Destroy);

router.put('/nickname', verifyAuth, UpdateUsername);

export const userRoute = router;
