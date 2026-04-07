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
  const result = await db.query.recipeTable.findFirst({
    where: eq(recipeTable.id, id),
    with: {
      ingredients: true,
      steps: {
        orderBy: (steps, { asc }) => [asc(steps.stepNumber)],
      },
      recipeTags: {
        with: {
          tag: {
            columns: { id: true, name: true },
          },
        },
      },
    },
  });

  const recipe = {
    ...result!,
    tags: result!.recipeTags.map((rt) => rt.tag),
  } as Recipe;

  return <RecipeDetail recipe={recipe} />;
}
