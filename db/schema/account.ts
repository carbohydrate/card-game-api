import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const account = pgTable('account', {
    id: serial('id').primaryKey(),
    username: varchar('username', { length: 50 }).notNull().unique(),
    password: varchar('password', { length: 250 }).notNull(),
});
