import express, { NextFunction, Request, Response } from 'express';
import { db } from '../db';
import { set } from '../../db/schema/set';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    console.time('postgres-js');
    const dbSet = await db.select().from(set);
    console.log('dbSet:', dbSet);
    console.timeEnd('postgres-js');

    res.status(200).send('Hello World');
});

export const baseRoute = router;
