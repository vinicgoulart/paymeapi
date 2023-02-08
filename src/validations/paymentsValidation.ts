import { Request, Response, NextFunction } from "express";

const ValidateStore = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.title || !req.body.description || !req.body.value || !req.body.category || !req.body.datePayment){
        res.status(400).json({ status: 'Failed', message: 'All fields must be filled!' });
        return;
    }

    if(new Date(req.body.datePayment).valueOf() < Date.now()){
        res.status(400).json({ status: 'Failed', message: 'Date must be in the future!' });
        return;
    }

    next();
};

const ValidateUpdate = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.title && !req.body.description && !req.body.value && !req.body.datePayment){
        res.status(400).json({ status: 'Failed', message: 'At least one field must be filled!' });
        return;
    }

    if(new Date(req.body.datePayment).valueOf() < Date.now()){
        res.status(400).json({ status: 'Failed', message: 'Date must be in the future!' });
        return;
    }

    next();
}

export { ValidateStore, ValidateUpdate };
