import express, { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getLoginInfo } from '../controllers/get-login';
import { getAccountByUsername } from '../controllers/account';
import { isAuthenticated } from '../middleware/is-authenticated';

const router = express.Router();
const jsonParser = express.json();

interface SessionPostBody {
    username: string;
    password: string;
}

router.post('/', jsonParser, async (req: Request<void, void, SessionPostBody>, res: Response, next: NextFunction) => {
    console.log('req.body:', req.body);

    if (!req.body.password) {
        console.log('No password provided.');
        throw new Error('No password provided.');
    }

    const dbAccount = await getAccountByUsername(req.body.username);

    if (dbAccount.rows.length) {
        const match = await bcrypt.compare(req.body.password, dbAccount.rows[0].password);

        if (match) {
            const accountId = dbAccount.rows[0].id

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

router.get('/', isAuthenticated, async (req: Request, res: Response) => {
    res.status(200).send(true);

});

export const sessionRoute = router;
