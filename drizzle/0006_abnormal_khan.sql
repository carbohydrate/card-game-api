CREATE TABLE IF NOT EXISTS "games" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" integer DEFAULT 1 NOT NULL,
	"player1" integer NOT NULL,
	"player2" integer NOT NULL
);
