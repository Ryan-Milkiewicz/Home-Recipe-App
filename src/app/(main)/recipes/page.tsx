import { db } from "@/index";
import { getAllRecipes, getRecipesByTag } from "@/actions/recipes";
import RecipeCard from "../components/RecipeCard";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  // TODO: add real images
  const { tag } = await searchParams;
  const recipes = tag ? await getRecipesByTag(tag) : await getAllRecipes();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-6">
      {recipes && recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            description={recipe.description}
            cookTime={recipe.cookTime}
            servings={recipe.servings}
            imageUrl={recipe.imageUrl ? recipe.imageUrl : ""}
            tags={recipe.recipeTags.map((rt) => rt.tag)}
          />
        ))
      ) : (
        <p className="text-center text-muted-foreground col-span-full">
          No recipes found.
        </p>
      )}
    </div>
  );
}
