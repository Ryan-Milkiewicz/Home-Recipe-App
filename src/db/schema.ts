import { relations } from "drizzle-orm";
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
  amount: integer().notNull(),
  unit: varchar({ length: 50 }).notNull(),
});

export const stepTable = pgTable("steps", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  recipeId: integer()
    .notNull()
    .references(() => recipeTable.id, { onDelete: "cascade" }),
  stepNumber: integer().notNull(),
  step: text().notNull(),
});

// Relations
export const recipeRelations = relations(recipeTable, ({ many }) => ({
  ingredients: many(ingredientTable),
  steps: many(stepTable),
}));

export const ingredientRelations = relations(ingredientTable, ({ one }) => ({
  recipe: one(recipeTable, {
    fields: [ingredientTable.recipeId],
    references: [recipeTable.id],
  }),
}));

export const stepsRelations = relations(stepTable, ({ one }) => ({
  recipe: one(recipeTable, {
    fields: [stepTable.recipeId],
    references: [recipeTable.id],
  }),
}));
