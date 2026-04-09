import { relations } from "drizzle-orm";
import {
  integer,
  numeric,
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
  description: varchar({ length: 1000 }).notNull(),
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
  amount: numeric({ precision: 8, scale: 3 }).notNull(),
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

export const tagTable = pgTable("tags", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 100 }).notNull().unique(),
});

export const recipeTagTable = pgTable("recipe_tags", {
  recipeId: integer()
    .notNull()
    .references(() => recipeTable.id, { onDelete: "cascade" }),
  tagId: integer()
    .notNull()
    .references(() => tagTable.id, { onDelete: "cascade" }),
});

// Relations
export const recipeRelations = relations(recipeTable, ({ many }) => ({
  ingredients: many(ingredientTable),
  steps: many(stepTable),
  recipeTags: many(recipeTagTable),
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

export const tagRelations = relations(tagTable, ({ many }) => ({
  recipeTags: many(recipeTagTable),
}));

export const recipeTagRelations = relations(recipeTagTable, ({ one }) => ({
  recipe: one(recipeTable, {
    fields: [recipeTagTable.recipeId],
    references: [recipeTable.id],
  }),
  tag: one(tagTable, {
    fields: [recipeTagTable.tagId],
    references: [tagTable.id],
  }),
}));
