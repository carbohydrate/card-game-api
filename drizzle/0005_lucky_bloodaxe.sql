CREATE TABLE IF NOT EXISTS "deck_card" (
	"decksId" integer NOT NULL,
	"cardsId" integer NOT NULL,
	CONSTRAINT "deck_card_decksId_cardsId_pk" PRIMARY KEY("decksId","cardsId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "deck_card" ADD CONSTRAINT "deck_card_decksId_decks_id_fk" FOREIGN KEY ("decksId") REFERENCES "decks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "deck_card" ADD CONSTRAINT "deck_card_cardsId_cards_id_fk" FOREIGN KEY ("cardsId") REFERENCES "cards"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
