import pg, { QueryResultRow } from 'pg';

const { Pool } = pg;

const pool = new Pool();

// if you need a transaction, do not use the pool
export const dbQuery = <T>(text: string, params?: any, callback?: () => void) => {
    return pool.query<T extends QueryResultRow ? T : any>(text, params);
};
