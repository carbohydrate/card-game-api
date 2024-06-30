import { dbQuery } from '../db';

const dbCardsQuery = `
SELECT id, set_id, name
FROM cards;
`;

interface DbCards {
    id: number;
    set_id: number;
    name: string;
}

export const getCards = async () => {
    const dbCards = await dbQuery<DbCards>(dbCardsQuery);

    return dbCards;
};
