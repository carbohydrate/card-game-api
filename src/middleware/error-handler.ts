import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    const response = {
        message: err.message || 'Something broke!',
    }

    res.status(500).send(response);
}
