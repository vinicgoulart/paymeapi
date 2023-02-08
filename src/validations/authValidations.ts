import { Response, Request, NextFunction } from "express";

const ValidateRegister = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.username || !req.body.email || !req.body.password){
        res.status(400).json({ status: 'Failed', message: 'All fields must be filled!' });
        return;
    }

    var username = req.body.username;
    var pattern = /[a-zA-Z0-9]{3,}/;
    var isAlphanumeric = pattern.test(username);

    if(!isAlphanumeric){
        res.status(400).json({ status: 'Failed', message: 'Username must be longer than 3 characters alphanumerics!' });
        return;
    }

    var passwordPattern = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;
    var isPassStrong = passwordPattern.test(req.body.password);

    if(!isPassStrong){
        res.status(400).json({ status: 'Failed', message: 'Password must be strong!' });
        return;
    }

    next();
};

const ValidateLogin = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.email || !req.body.password){
        res.status(400).json({ status: 'Failed', message: 'Both fields must be filled!' });
        return;
    }

    next();
};


export { ValidateRegister, ValidateLogin };
