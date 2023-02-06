import express from 'express';
import { Destroy, UpdateUsername, Index } from '../controllers/userController';

const router = express.Router();

router.get('/', Index);

router.delete('/destroy/:username', Destroy);

router.put('/nickname', UpdateUsername);

export const userRoute = router;
