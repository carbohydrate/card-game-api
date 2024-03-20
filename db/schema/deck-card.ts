import { integer } from 'drizzle-orm/pg-core';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { decks } from './decks';
import { cards } from './cards';
import { primaryKey } from 'drizzle-orm/pg-core';

export const deckCard = pgTable('deck_card', {
    decksId: integer('decksId').notNull().references(() => decks.id),
    cardsId: integer('cardsId').notNull().references(() => cards.id),
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.decksId, table.cardsId] }),
    }
});
