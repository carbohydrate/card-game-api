import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';

const router = express.Router();
const jsonParser = bodyParser.json();

interface GamePostBody {
}

router.post('/', jsonParser, async (req: Request<GamePostBody>, res: Response, next: NextFunction) => {
    console.log('req.body:', req.body);

    res.status(200).send({ a: 123 });
});

export const gameRoute = router;
