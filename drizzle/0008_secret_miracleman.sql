DO $$ BEGIN
 ALTER TABLE "games" ADD CONSTRAINT "games_player1_account_id_fk" FOREIGN KEY ("player1") REFERENCES "account"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "games" ADD CONSTRAINT "games_player2_account_id_fk" FOREIGN KEY ("player2") REFERENCES "account"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
