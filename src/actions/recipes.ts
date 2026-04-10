"use server";
import { db } from "@/index";
import { eq } from "drizzle-orm";
import {
  recipeTable,
  ingredientTable,
  stepTable,
  tagTable,
  recipeTagTable,
} from "@/db/schema";

export async function getAllRecipes() {
  return await db.query.recipeTable.findMany({
    orderBy: (recipes, { asc }) => [asc(recipes.id)],
    with: {
      recipeTags: {
        with: {
          tag: {
            columns: { id: true, name: true },
          },
        },
      },
    },
  });
}

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
      webUrl: value.webUrl,
      imageUrl: value.imageUrl,
    })
    .returning();

  // Insert ingredients
  await db.insert(ingredientTable).values(
    value.ingredients.map(
      (i: { ingredientName: string; amount: number; unit: string }) => ({
        recipeId: recipe.id,
        ingredientName: i.ingredientName,
        amount: toDecimal(i.amount),
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

export async function editRecipe(id: number, value: any) {
  // Update recipe
  const [recipe] = await db
    .update(recipeTable)
    .set({
      title: value.recipeTitle,
      description: value.recipeDescription,
      prepTime: Number(value.prepTime),
      cookTime: Number(value.cookTime),
      servings: Number(value.servings),
      difficulty: value.difficulty,
      webUrl: value.webUrl,
      imageUrl: value.imageUrl,
    })
    .where(eq(recipeTable.id, id))
    .returning();

  // Delete and re-insert ingredients
  await db.delete(ingredientTable).where(eq(ingredientTable.recipeId, id));
  await db.insert(ingredientTable).values(
    value.ingredients.map(
      (i: { ingredientName: string; amount: number; unit: string }) => ({
        recipeId: id,
        ingredientName: i.ingredientName,
        amount: toDecimal(i.amount),
        unit: i.unit,
      }),
    ),
  );

  // Delete and re-insert steps
  await db.delete(stepTable).where(eq(stepTable.recipeId, id));
  await db.insert(stepTable).values(
    value.steps.map((s: { step: string }, index: number) => ({
      recipeId: id,
      stepNumber: index + 1,
      step: s.step,
    })),
  );

  // Delete and re-insert tags
  await db.delete(recipeTagTable).where(eq(recipeTagTable.recipeId, id));
  if (value.tags && value.tags.length > 0) {
    for (const tagName of value.tags) {
      const [tag] = await db
        .insert(tagTable)
        .values({ name: tagName })
        .onConflictDoUpdate({ target: tagTable.name, set: { name: tagName } })
        .returning();

      await db.insert(recipeTagTable).values({ recipeId: id, tagId: tag.id });
    }
  }

  return recipe;
}

function toDecimal(amount: string | number): number {
  if (typeof amount === "number") return amount;
  const parts = amount.trim().split(" ");

  if (parts.length === 2) {
    // "1 3/4" → whole + fraction
    const whole = parseFloat(parts[0]);
    const [num, denom] = parts[1].split("/");
    return whole + parseFloat(num) / parseFloat(denom);
  }

  if (parts[0].includes("/")) {
    // "3/4" → just a fraction
    const [num, denom] = parts[0].split("/");
    return parseFloat(num) / parseFloat(denom);
  }

  return parseFloat(parts[0]);
}
