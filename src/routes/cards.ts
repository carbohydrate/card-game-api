import express, { Request, Response } from 'express';
import { getCards } from '../controllers/get-cards';

const router = express.Router();
// const jsonParser = express.json();

// interface AccountPostBody {
//     username: string;
//     password: string;
// }

router.get('/', async (req: Request, res: Response) => {
    const dbCards = await getCards();
    // const dbAccount = await getAccountByUsername(req.body.username);

    if (dbCards.rows.length) {
        // const salt = await bcrypt.genSalt(10);
        // const hash = await bcrypt.hash(req.body.password, salt);

        // await createAccount(req.body.username, hash);

        res.status(200).send(dbCards.rows);
    } else {
        throw new Error('No Cards found');
    }
});

export const cardsRoute = router;
