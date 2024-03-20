import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const cards = pgTable('cards', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
});
