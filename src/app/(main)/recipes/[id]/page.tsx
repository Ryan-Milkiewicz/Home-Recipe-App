import { db } from "@/index";
import { eq } from "drizzle-orm";
import { recipeTable } from "@/db/schema";
import RecipeDetail from "../../components/RecipeDetail";
import { Recipe } from "@/lib/types/recipe";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const recipe = (await db.query.recipeTable.findFirst({
    where: eq(recipeTable.id, id),
    with: {
      ingredients: true,
      steps: {
        columns: { step: true },
        orderBy: (steps, { asc }) => [asc(steps.stepNumber)],
      },
    },
  })) as Recipe;

  return <RecipeDetail recipe={recipe} />;
}
