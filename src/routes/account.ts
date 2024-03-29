import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { db } from '../db';
import { account } from '../../db/schema/account';
import { eq } from 'drizzle-orm';

const router = express.Router();
const jsonParser = express.json();

interface AccountPostBody {
    username: string;
    password: string;
}

router.post('/', jsonParser, async (req: Request<AccountPostBody>, res: Response) => {
    console.log('req:', req);
    const dbAccount = await db.select().from(account).where(eq(account.username, req.body.username));

    if (!dbAccount.length) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        await db.insert(account).values({
            username: req.body.username,
            password: hash,
        });

        res.status(201).send({ message: 'Account Created!' });
    } else {
        throw new Error('Username exists!');
    }
});

export const accountRoute = router;
