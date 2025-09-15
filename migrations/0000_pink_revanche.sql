CREATE TABLE "todo" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"emoji" text NOT NULL,
	"votes" integer DEFAULT 0 NOT NULL
);
