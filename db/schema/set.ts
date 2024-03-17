import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const set = pgTable('set', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
});
