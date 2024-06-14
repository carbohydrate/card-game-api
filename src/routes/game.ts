import express, { NextFunction, Request, Response } from 'express';
import { checkPlayerFound, createNewGame, getGameState, getGamesByStatus, startGame, updateAndStartGame, updateGameStatus } from '../controllers/game';
import { GameStatus } from '../constants';

const router = express.Router();
const jsonParser = express.json();;

interface GameStartPostBody {
    playerId: number;
}

router.post('/start', jsonParser, async (req: Request<void, void, GameStartPostBody>, res: Response, next: NextFunction) => {
    // check if anyone waiting
    const dbGames = await getGamesByStatus(GameStatus.Waiting);
    // if no, create record in table and wait
    if (!dbGames.rowCount) {
        const gameId = await createNewGame(req.body.playerId);

        startGame(gameId);

        res.status(202).send({ gameId: gameId });
    } else {
        // player started game, left and started again before a 2nd player was found
        if (req.body.playerId === dbGames.rows[0].player1) {
            res.status(202).send({ gameId: dbGames.rows[0].id });
        } else {
            // update player2
            await updateAndStartGame(req.body.playerId, dbGames.rows[0].id);
            res.status(200).send({ gameId: dbGames.rows[0].id });
        }
    }
});

// player waiting, check if a player as been found...
router.get('/start/:gameId', async (req: Request<{ gameId: string }>, res: Response, next: NextFunction) => {
    const gameId = req.params.gameId;
    const dbGames = await checkPlayerFound(GameStatus.Waiting, Number(gameId));

    if (dbGames.rowCount) {
        await updateGameStatus(GameStatus.Started, dbGames.rows[0].id);
        res.status(200).send();
    } else {
        res.status(204).send();
    }
});

router.get('/state/:gameId', async (req: Request<{ gameId: string }>, res: Response, next: NextFunction) => {
    res.status(200).send(getGameState(Number(req.params.gameId)));
});

interface GamePostBody {
}

router.post('/action', jsonParser, async (req: Request<GamePostBody>, res: Response, next: NextFunction) => {
    console.log('req.body:', req.body);

    res.status(200).send({ a: 123 });
});

export const gameRoute = router;
