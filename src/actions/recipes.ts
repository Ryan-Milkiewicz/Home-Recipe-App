"use server";
"use server";
import { db } from "@/index";
import {
  recipeTable,
  ingredientTable,
  stepTable,
  tagTable,
  recipeTagTable,
} from "@/db/schema";

export async function createRecipe(value: any) {
  // Insert recipe
  const [recipe] = await db
    .insert(recipeTable)
    .values({
      title: value.recipeTitle,
      description: value.recipeDescription,
      prepTime: Number(value.prepTime),
      cookTime: Number(value.cookTime),
      servings: Number(value.servings),
      difficulty: value.difficulty,
    })
    .returning();

  // Insert ingredients
  await db.insert(ingredientTable).values(
    value.ingredients.map(
      (i: { ingredientName: string; amount: number; unit: string }) => ({
        recipeId: recipe.id,
        ingredientName: i.ingredientName,
        amount: i.amount,
        unit: i.unit,
      }),
    ),
  );

  // Insert steps
  await db.insert(stepTable).values(
    value.steps.map((s: { step: string }, index: number) => ({
      recipeId: recipe.id,
      stepNumber: index + 1,
      step: s.step,
    })),
  );

  // Check if there are tags to insert
  if (value.tags && value.tags.length > 0) {
    for (const tagName of value.tags) {
      // Insert tag, get id back
      const [tag] = await db
        .insert(tagTable)
        .values({ name: tagName })
        .onConflictDoUpdate({ target: tagTable.name, set: { name: tagName } })
        .returning();

      await db.insert(recipeTagTable).values({
        recipeId: recipe.id,
        tagId: tag.id,
      });
    }
  }

  return recipe;
}
