CREATE TABLE "events" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "events_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"recipeId" integer NOT NULL,
	"date" date NOT NULL,
	CONSTRAINT "events_date_unique" UNIQUE("date")
);
--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_recipeId_recipes_id_fk" FOREIGN KEY ("recipeId") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;