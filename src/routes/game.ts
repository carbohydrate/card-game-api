import express, { NextFunction, Request, Response } from 'express';
import { db } from '../db';
import { games } from '../../db/schema/games';
import { and, eq, isNotNull } from 'drizzle-orm';
import { getGameState, startGame } from '../controllers/game';

const router = express.Router();
const jsonParser = express.json();;

interface GameStartPostBody {
    playerId: number;
}

router.post('/start', jsonParser, async (req: Request<void, void, GameStartPostBody>, res: Response, next: NextFunction) => {
    // check if anyone waiting
    const dbGames = await db.select().from(games).where(eq(games.status, 1));
    // if no, create record in table and wait
    if (!dbGames.length) {
        const gameId = (await db.insert(games).values({
            player1: req.body.playerId,
        }).returning({ id: games.id }))[0].id;

        startGame(gameId);

        res.status(202).send({ gameId: gameId });
    } else {
        // player started game, left and started again before a 2nd player was found
        if (req.body.playerId === dbGames[0].player1) {
            res.status(202).send({ gameId: dbGames[0].id });
        } else {
            // update player2
            await db.update(games).set({ player2: req.body.playerId }).where(eq(games.id, dbGames[0].id));
            res.status(200).send({ gameId: dbGames[0].id });
        }
    }
});

// player waiting, check if a player as been found...
router.get('/start/:gameId', async (req: Request<{ gameId: string }>, res: Response, next: NextFunction) => {
    const gameId = req.params.gameId;
    const dbGames = await db.select().from(games).where(
        and(
            eq(games.status, 1),
            eq(games.id, Number(gameId)),
            isNotNull(games.player2),
        )
    );

    if (dbGames.length) {
        await db.update(games).set({ status: 2 }).where(eq(games.id, dbGames[0].id));
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
