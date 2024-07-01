import { dbQuery } from '../db';

const dbCardsQuery = `
SELECT id, set_id, name, attack, health
FROM cards;
`;

interface DbCards {
    id: number;
    set_id: number;
    name: string;
    attack: number;
    health: number;
}

export const getCards = async () => {
    const dbCards = await dbQuery<DbCards>(dbCardsQuery);

    return dbCards;
};
