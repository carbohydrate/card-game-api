import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import { db } from '../db';
import { account } from '../../db/schema/account';
import { eq } from 'drizzle-orm';
import { getLoginInfo } from '../controllers/get-login';

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
            const accountId = dbAccount[0].id

            req.session.regenerate(async (err) => {
                if (err) {
                    throw new Error('req.session.regenerate error');
                }
                req.session.accountId = accountId;

                const loginInfo = await getLoginInfo(accountId);
                res.status(200).send(loginInfo);

                // https://www.npmjs.com/package/express-session#sessionsavecallback
                // req.session.save((err) => {
                //     if (err) {
                //         throw new Error('req.session.save error');
                //     }
                // });
            });
        } else {
            throw new Error('Invalid password.');
        }
    } else {
        throw new Error('Account not found');
    }
});

export const sessionRoute = router;
