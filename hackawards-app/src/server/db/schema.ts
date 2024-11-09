// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql, relations} from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `hackawards-app_${name}`);

export const users = createTable(
  "user",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    username: varchar("username", { length: 256 }).notNull().unique(),
    email: varchar("email", { length: 256 }).notNull(),
    profile_url: varchar("email", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  }
);
export const usersRelations = relations(users, ({ many }) => ({
	participants: many(participants),
}));
export const hackathons = createTable(
  "hackathon",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull().unique(),
    description: varchar("description", { length: 256 }).notNull(),
    start_date: timestamp("start_date", { withTimezone: true }).notNull(),
    end_date: timestamp("end_date", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  }
);
export const hackathonsRelations = relations(hackathons, ({ many }) => ({
	participants: many(participants),
}));
export const participants = createTable(
  "participant",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    user_id: integer("user_id").notNull(),
    hackathon_id: integer("hackathon_id").notNull(),
    repository_url: varchar("repository_url", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  }
);
export const participantsRelations = relations(participants, ({ one }) => ({
	participant: one(users, {
		fields: [participants.user_id],
		references: [users.id],
	}),
	hackathon: one(hackathons, {
		fields: [participants.hackathon_id],
		references: [hackathons.id],
	}),
}));
