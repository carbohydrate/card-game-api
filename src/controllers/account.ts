import { dbQuery } from '../db/index';

const query = `
SELECT id, password
FROM accounts
WHERE username = $1;
`;

interface DbAccount {
    id: number;
    password: string;
}

export const getAccountByUsername = async (username: string) => {
    const dbAccount = await dbQuery<DbAccount>(query, [username]);
    return dbAccount;
};

const createAccountQuery = `
INSERT INTO accounts(username, password) VALUES ($1, $2);
`;

export const createAccount = async (username: string, hash: string) => {
    await dbQuery(createAccountQuery, [username, hash]);
};
