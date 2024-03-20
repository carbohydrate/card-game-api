import { integer } from 'drizzle-orm/pg-core';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { account } from './account';

export const decks = pgTable('decks', {
    id: serial('id').primaryKey(),
    accountId: integer('accountId').notNull().references(() => account.id),
    name: text('name').notNull(),
});
