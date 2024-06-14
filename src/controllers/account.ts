import { dbQuery } from '../db/index';

const query = `
SELECT id, password
FROM account
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
