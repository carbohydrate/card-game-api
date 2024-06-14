import { dbQuery } from '../db/index';

const dbDecksQuery = `
SELECT id, account_id, name
FROM decks
WHERE account_id = $1;
`;

const dbDeckCardQuery = `
SELECT deck_id, card_id
FROM deck_card dc
INNER JOIN decks d
ON dc.deck_id = d.id;
`;

interface DbDecks {
    id: number;
    accountId: number;
    name: string;
}

interface DbDeckCard {
    deck_id: number;
    card_id: number;
}

export const getLoginInfo = async (accountId: number) => {
    const dbDecks = await dbQuery<DbDecks>(dbDecksQuery, [accountId]);
    console.log('dbDecks:', dbDecks.rows);

    // test
    const dbDeckCards = await dbQuery<DbDeckCard>(dbDeckCardQuery);
    console.log('dbDeckCards:', dbDeckCards.rows);

    return {
        playerId: accountId,
        decks: dbDecks.rows,
    }
};
