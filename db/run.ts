import pg, { QueryResultRow } from 'pg';
import { migration } from './migrations/base';

const { Pool } = pg;

const pool = new Pool();

// if you need a transaction, do not use the pool
const dbQuery = <T>(text: string, params?: any, callback?: () => void) => {
    return pool.query<T extends QueryResultRow ? T : any>(text, params);
};

const run = async (query: string) => {
    await dbQuery(query);
}

const test = migration();

console.log('starting query');
run(test);
console.log('query done!');
