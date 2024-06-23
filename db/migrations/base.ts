export const migration = () => {
    const sql = `
        CREATE TABLE accounts (
            id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            username varchar(50) NOT NULL UNIQUE,
            password varchar(250) NOT NULL
        );

        CREATE TABLE cards (
            id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name text NOT NULL
        );

        CREATE TABLE decks (
            id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            account_id int4 NOT NULL REFERENCES accounts(id),
            name text NOT NULL
        );

        CREATE TABLE deck_card (
            deck_id int4 NOT NULL REFERENCES decks(id),
            card_id int4 NOT NULL REFERENCES cards(id),
            PRIMARY KEY (deck_id, card_id)
        );

        CREATE TABLE games (
            id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            status smallint NOT NULL DEFAULT 1,
            account1 integer NOT NULL REFERENCES accounts(id),
            account2 integer NULL REFERENCES accounts(id)
        );

        CREATE TABLE sets (
            id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name text NOT NULL
        );
    `;

    return sql;
}
