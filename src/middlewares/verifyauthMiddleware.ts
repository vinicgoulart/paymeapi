import { Response, Request, NextFunction } from "express";

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
    if(!req.session._id || !req.session.username){
        res.status(403).json({ status: 'Failed', message: 'Unauthorized!' });
        return;
    }

    next();
};

export { verifyAuth };
