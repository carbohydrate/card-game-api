-- public.accounts definition

-- Drop table

-- DROP TABLE public.accounts;

CREATE TABLE public.accounts (
	id int4 NOT NULL DEFAULT nextval('account_id_seq'::regclass),
	username varchar(50) NOT NULL,
	"password" varchar(250) NOT NULL,
	CONSTRAINT account_pkey PRIMARY KEY (id),
	CONSTRAINT account_username_unique UNIQUE (username)
);

-- public.cards definition

-- Drop table

-- DROP TABLE public.cards;

CREATE TABLE public.cards (
	id serial4 NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT cards_pkey PRIMARY KEY (id)
);

-- public.deck_card definition

-- Drop table

-- DROP TABLE public.deck_card;

CREATE TABLE public.deck_card (
	deck_id int4 NOT NULL,
	card_id int4 NOT NULL,
	CONSTRAINT "deck_card_decksId_cardsId_pk" PRIMARY KEY (deck_id, card_id)
);


-- public.deck_card foreign keys

ALTER TABLE public.deck_card ADD CONSTRAINT "deck_card_cardsId_cards_id_fk" FOREIGN KEY (card_id) REFERENCES public.cards(id);
ALTER TABLE public.deck_card ADD CONSTRAINT "deck_card_decksId_decks_id_fk" FOREIGN KEY (deck_id) REFERENCES public.decks(id);

-- public.decks definition

-- Drop table

-- DROP TABLE public.decks;

CREATE TABLE public.decks (
	id serial4 NOT NULL,
	account_id int4 NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT decks_pkey PRIMARY KEY (id)
);


-- public.decks foreign keys

ALTER TABLE public.decks ADD CONSTRAINT "decks_accountId_account_id_fk" FOREIGN KEY (account_id) REFERENCES public.accounts(id);

-- public.games definition

-- Drop table

-- DROP TABLE public.games;

CREATE TABLE public.games (
	id serial4 NOT NULL,
	status int4 NOT NULL DEFAULT 1,
	player1 int4 NOT NULL,
	player2 int4 NULL,
	CONSTRAINT games_pkey PRIMARY KEY (id)
);


-- public.games foreign keys

ALTER TABLE public.games ADD CONSTRAINT games_player1_account_id_fk FOREIGN KEY (player1) REFERENCES public.accounts(id);
ALTER TABLE public.games ADD CONSTRAINT games_player2_account_id_fk FOREIGN KEY (player2) REFERENCES public.accounts(id);

-- public."sets" definition

-- Drop table

-- DROP TABLE public."sets";

CREATE TABLE public."sets" (
	id int4 NOT NULL DEFAULT nextval('set_id_seq'::regclass),
	"name" text NOT NULL,
	CONSTRAINT set_pkey PRIMARY KEY (id)
);

