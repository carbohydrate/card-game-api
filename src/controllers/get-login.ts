import { db } from '../db';
import { decks } from '../../db/schema/decks';
import { eq } from 'drizzle-orm';
import { deckCard } from '../../db/schema/deck-card';

export const getLoginInfo = async (accountId: number) => {
    const dbDecks = await db.select().from(decks).where(eq(decks.accountId, accountId));
    console.log('dbDecks:', dbDecks);

    // test
    const dbDeckCards = await db.select().from(decks).innerJoin(deckCard, eq(decks.id, deckCard.decksId));
    console.log('dbDeckCards:', dbDeckCards);

    return {
        playerId: accountId,
        decks: dbDecks,
    }
}
