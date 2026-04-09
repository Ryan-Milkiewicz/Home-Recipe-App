import { db } from "@/index";
import { eq } from "drizzle-orm";
import AddRecipeForm from "../../../components/AddRecipeForm";
import { recipeTable } from "@/db/schema";

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
          tag: { columns: { id: true, name: true } },
        },
      },
    },
  });

  const recipe = {
    ...result!,
    recipeTitle: result!.title,
    recipeDescription: result!.description,
    tags: result!.recipeTags.map((rt) => rt.tag.name),
  };

  return <AddRecipeForm defaultValues={recipe} id={id} />;
}
