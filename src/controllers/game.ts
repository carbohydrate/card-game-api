import { GameStatus } from '../constants';
import { dbQuery } from '../db';

const gameStatusQuery = `
SELECT id, player1
FROM games
WHERE status = $1;
`;

interface DbGame {
    id: number;
    player1: number;
}

export const getGamesByStatus = async (status: GameStatus) => {
    const dbGames = await dbQuery<DbGame>(gameStatusQuery, [status]);
    return dbGames;
};

const createNewGameQuery = `
INSERT INTO games(player1) VALUES ($1) RETURNING id;
`;

interface DbCreateGame {
    id: number;
}

export const createNewGame = async (player1Id: number) => {
    const dbNewGame = await dbQuery<DbCreateGame>(createNewGameQuery, [player1Id]);
    return dbNewGame.rows[0].id;
};

const startGameQuery = `
UPDATE games SET player2 = $1
WHERE id = $2;
`;

export const updateAndStartGame = async (player2Id: number, gameId: number) => {
    await dbQuery(startGameQuery, [player2Id, gameId]);
};

const playerFoundQuery = `
SELECT id
FROM games
WHERE status = $1 AND id = $2 AND player2 IS NOT NULL;
`;

interface DbGameFound {
    id: number;
}

export const checkPlayerFound = async (status: GameStatus, gameId: number) => {
    const dbGames = await dbQuery<DbGameFound>(playerFoundQuery, [status, gameId]);
    return dbGames;
};

const updateGameStatusQuery = `
UPDATE games SET status = $1
WHERE id = $2;
`;

export const updateGameStatus = async (status: GameStatus, gameId: number) => {
    await dbQuery(updateGameStatusQuery, [status, gameId]);
};

interface GameState {
    id: number;
    first: number;
}
const games: GameState[] = [];

export const getGameState = (gameId: number) => {
    const game = games.find(x => x.id === gameId);
    if (!game) {
        throw new Error(`No game in state with id: ${gameId}`);
    }
    return game;
}

export const startGame = (gameId: number) => {
    const newGame = {
        id: gameId,
        first: Math.floor(Math.random() * 2),
    }
    games.push(newGame);
};
