import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import { db } from '../db';
import { account } from '../../db/schema/account';
import { eq } from 'drizzle-orm';

const router = express.Router();
const jsonParser = bodyParser.json();

interface SessionPostBody {
    username: string;
    password: string;
}

router.post('/', jsonParser, async (req: Request<SessionPostBody>, res: Response, next: NextFunction) => {
    console.log('req.body:', req.body);

    if (!req.body.password) {
        console.log('No password provided.');
        throw new Error('No password provided.');
    }

    const dbAccount = await db.select({
        id: account.id,
        password: account.password,
    }).from(account).where(eq(account.username, req.body.username)).limit(1);

    if (dbAccount.length) {
        const match = await bcrypt.compare(req.body.password, dbAccount[0].password);

        if (match) {
            req.session.regenerate((err) => {
                if (err) {
                    throw new Error('req.session.regenerate error');
                }
                req.session.accountId = dbAccount[0].id;

                req.session.save((err) => {
                    if (err) {
                        throw new Error('req.session.save error');
                    }
                    res.status(200).send({ message: 'TestMessage' });
                });
            });
        } else {
            throw new Error('Invalid password.');
        }
    } else {
        throw new Error('Account not found');
    }
});

// middleware to test if authenticated
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    console.log('req.session.accountId:', req.session.accountId);
    if (req.session.accountId) {
        next();
    } else {
        throw new Error('User not authenticated.');
        // return next(new Error('User not authenticated.'));
    }
}

router.get('/', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    console.log('req.session:', req.session);
    console.log('we are auth!');
    res.send('AUTH!!!!!!!!!');
});

export const sessionRoute = router;
