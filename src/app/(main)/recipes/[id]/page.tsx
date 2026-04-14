import { db } from "@/index";
import { eq } from "drizzle-orm";
import { recipeTable } from "@/db/schema";
import RecipeDetail from "../../components/RecipeDetail";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Recipe } from "@/lib/types/recipe";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

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

  const editHandler = async (id: number) => {
    "use server";
    redirect(`/recipes/${id}/edit`);
  };

  const deleteHandler = async (id: number) => {
    "use server";
    try {
      const [deletedRecipe] = await db
        .delete(recipeTable)
        .where(eq(recipeTable.id, id))
        .returning({ imageUrl: recipeTable.imageUrl });

      if (deletedRecipe?.imageUrl) {
        const fileKey = deletedRecipe.imageUrl.split("/").pop();
        if (fileKey) await utapi.deleteFiles(fileKey);
      }

      revalidatePath("/recipes");
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
    redirect("/recipes");
  };

  return (
    <RecipeDetail
      recipe={recipe}
      onDelete={deleteHandler}
      onEdit={editHandler}
    />
  );
}
