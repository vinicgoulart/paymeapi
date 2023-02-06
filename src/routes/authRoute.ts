import express, { Router } from "express";
import { Register, Login, Logout } from '../controllers/authController';

const router: Router = express.Router();

router.post('/register', Register);

router.post('/login', Login);

router.get('/logout', Logout);

export const authRouter = router;
