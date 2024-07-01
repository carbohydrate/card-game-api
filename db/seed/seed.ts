import pg, { QueryResultRow } from 'pg';
import { cards, sets } from './data';

const { Pool } = pg;

const pool = new Pool();

// if you need a transaction, do not use the pool
const dbQuery = <T>(text: string, params?: any, callback?: () => void) => {
    return pool.query<T extends QueryResultRow ? T : any>(text, params);
};

const seed = async () => {
    for (const set of sets) {
        await dbQuery(`INSERT INTO sets VALUES (DEFAULT, '${set.name}');`);
    }

    for (const card of cards) {
        await dbQuery(`INSERT INTO cards VALUES (DEFAULT, ${card.set_id}, '${card.name}', ${card.attack}, ${card.health});`);
    }

    // console.log('abc123whendoesthishappen');

}

const run = async () => {
    console.log('starting seed');
    await seed();
    console.log('seed data done');
}

run();
