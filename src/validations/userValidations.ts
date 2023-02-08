import { Request, Response, NextFunction } from "express";

const ValidateUpdateNickname = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.username){
        res.status(400).json({ status: 'Failed', message: 'You must fill your new username!' });
        return;
    }

    var username = req.body.username;
    var pattern = /[a-zA-Z0-9]{3,}/;
    var isAlphanumeric = pattern.test(username);

    if(!isAlphanumeric){
        res.status(400).json({ status: 'Failed', message: 'Username must be longer than 3 characters alphanumerics!' });
        return;
    }

    next();
};

export { ValidateUpdateNickname }
