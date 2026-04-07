import { db } from "@/index";
import { eq } from "drizzle-orm";
import { recipeTable, ingredientTable, stepTable } from "@/db/schema";
import RecipeDetail from "../../components/RecipeDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  // const recipe = await db
  //   .select()
  //   .from(recipeTable)
  //   .leftJoin(ingredientTable, eq(recipeTable.id, ingredientTable.recipeId))
  //   .leftJoin(stepTable, eq(recipeTable.id, stepTable.recipeId))
  //   .where(eq(recipeTable.id, id));

  const recipe = await db.query.recipeTable.findFirst({
    where: eq(recipeTable.id, id),
    with: {
      ingredients: true,
      steps: {
        columns: { step: true },
        orderBy: (steps, { asc }) => [asc(steps.stepNumber)],
      },
    },
  });

  // console.log(recipe);

  return <RecipeDetail recipe={recipe} />;
}
