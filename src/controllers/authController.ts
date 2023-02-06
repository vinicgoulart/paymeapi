import  { Request, Response } from "express";
import { userSchema } from "../models/userModel";
import bcrypt from 'bcrypt';

const Register = async (req: Request, res: Response) => {
    const userData = new userSchema({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try{
        let createUser = await userData.save();
        res.status(201).json({ status: 'Success', message: 'User created!' });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: error.message });
    }
};

const Login = async (req: Request, res: Response) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    };

    try{
        var user = await userSchema.findOne({ email: req.body.email });

        if(!user){
            res.status(400).json({ status: 'Failed', message: 'Wrong email or password!' });
            return;
        }

        var isValid = await bcrypt.compare(userData.password, user.password);

        if(!isValid){
            res.status(403).json({ status: 'Failed', message: 'Wrong email or password' });
            return;
        }

        req.session._id = user._id;
        req.session.username = user.username;
        req.session.save();

        res.status(200).json({ status: 'Success', message: 'Logged in!' });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: error.message });
    }
};

const Logout = (req: Request, res: Response) => {
    try{
        req.session._id = null;
        req.session.username = null;
        req.session.save();

        res.status(200).json({ status: 'Success', message: 'Logged out!' });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: error.message });
    }
};

export { Register, Login, Logout };
