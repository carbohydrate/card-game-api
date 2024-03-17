import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from './schema/_schema';

const migrationClient = postgres(process.env.DATABASE_URL, { max: 1 });

const migrationFunc = async () => {
    await migrate(drizzle(migrationClient, { schema }), { migrationsFolder: './drizzle' });
    migrationClient.end();
}

migrationFunc();
