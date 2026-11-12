import { pgTable, uuid, varchar, timestamp, check } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    age: varchar("age", { length: 3 }).notNull(),
    gender: varchar("gender", { enum: ["male", "female", "other"] }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    check("email_check", sql`${table.email} LIKE '%@%'`),
    check("password_check", sql`LENGTH(${table.password}) >= 8`),
  ],
);

export type User = typeof users.$inferSelect;