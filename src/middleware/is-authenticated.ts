import { NextFunction, Request, Response } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.accountId) {
        next();
    } else {
        throw new Error('User not authenticated.');
    }
}
