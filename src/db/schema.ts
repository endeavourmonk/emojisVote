import { integer, text, boolean, pgTable } from "drizzle-orm/pg-core";

export const emoji = pgTable("emoji", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  emoji: text("emoji").notNull(),
  votes: integer("votes").notNull().default(0),
});
