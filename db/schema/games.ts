import { integer } from 'drizzle-orm/pg-core';
import { pgTable, serial } from 'drizzle-orm/pg-core';
import { account } from './account';

export const games = pgTable('games', {
    id: serial('id').primaryKey(),
    status: integer('status').notNull().default(1),
    player1: integer('player1').notNull().references(() => account.id),
    player2: integer('player2').references(() => account.id),
});
