import { Request, Response } from "express";
import { userSchema } from "../models/userModel";

const Destroy = async (req: Request, res: Response) => {
    const query = { username: req.params.username };

    try{
        if(req.session.username !== req.params.username){
            res.status(403).json({ status: 'Failed', message: 'You are not allowed to do that! ' });
            return;
        }

        var deletedUser = await userSchema.deleteOne(query);
        req.session._id = null;
        req.session.username = null;
        req.session.save();
        res.status(200).json({ status: 'Success', message: 'User deleted!' });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: error.message });
    }
};

const UpdateUsername = async (req: Request, res: Response) => {
    const query = { _id: req.session._id };
    const userData = {
        username: req.body.username
    };

    try{
        var updateUser = await userSchema.findByIdAndUpdate(query, userData);
        res.status(200).json({ status: 'Success', message: 'Username changed!' });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: error.message });
    }
};

const Index = async (req: Request, res: Response) => {

    try{
        var listUser = await userSchema.find();
        res.status(200).json({ status: 'Success', list: listUser });
    }catch(error: any){
        res.status(500).json({ status: 'Failed', message: error.message });
    }
};

export { Destroy, UpdateUsername, Index };
