import express, { Router } from "express";
import { Register, Login, Logout } from '../controllers/authController';

import { ValidateRegister, ValidateLogin } from '../validations/authValidations';

const router: Router = express.Router();

router.post('/register', ValidateRegister, Register);

router.post('/login', ValidateLogin, Login);

router.get('/logout', Logout);

export const authRouter = router;
