import express, { NextFunction, Request, Response } from 'express';
import { dbQuery } from '../db';

const router = express.Router();

const testQuery = `
SELECT *
FROM sets
`;

interface DbSet {
    id: number;
    name: string;
}

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    console.time('pg');
    const dbSet = await dbQuery<DbSet>(testQuery);
    console.log('dbSet:', dbSet.rows);
    console.timeEnd('pg');

    res.status(200).send('Hello World');
});

export const baseRoute = router;
