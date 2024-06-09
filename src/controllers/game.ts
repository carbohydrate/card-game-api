
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
