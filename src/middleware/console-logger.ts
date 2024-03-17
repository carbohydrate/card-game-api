import { NextFunction, Request, Response } from 'express';

export const consoleLogger = (req: Request, _: Response, next: NextFunction) => {
    console.log(req.method, req.url);
    next();
}
