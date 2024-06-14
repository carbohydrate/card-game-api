import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createAccount, getAccountByUsername } from '../controllers/account';

const router = express.Router();
const jsonParser = express.json();

interface AccountPostBody {
    username: string;
    password: string;
}

router.post('/', jsonParser, async (req: Request<AccountPostBody>, res: Response) => {
    const dbAccount = await getAccountByUsername(req.body.username);

    if (!dbAccount.rows.length) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        await createAccount(req.body.username, hash);

        res.status(201).send({ message: 'Account Created!' });
    } else {
        throw new Error('Username exists!');
    }
});

export const accountRoute = router;
