import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
export const difficultyEnum = pgEnum("difficulty", ["easy", "medium", "hard"]);

export const recipeTable = pgTable("recipes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 100 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  prepTime: integer().notNull(),
  cookTime: integer().notNull(),
  servings: integer().notNull(),
  difficulty: difficultyEnum().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

export const ingredientTable = pgTable("ingredients", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  recipeId: integer()
    .notNull()
    .references(() => recipeTable.id, { onDelete: "cascade" }),
  ingredientName: varchar({ length: 100 }).notNull(),
  amount: varchar({ length: 50 }).notNull(),
  unit: varchar({ length: 50 }).notNull(),
});

export const stepsTable = pgTable("steps", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  recipeId: integer()
    .notNull()
    .references(() => recipeTable.id, { onDelete: "cascade" }),
  stepNumber: integer().notNull(),
  step: text().notNull(),
});
