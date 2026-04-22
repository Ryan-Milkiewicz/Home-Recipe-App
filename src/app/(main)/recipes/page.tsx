import {
  getAllRecipes,
  getRecipesByTag,
  searchRecipesByName,
  toggleRecipeFavorite,
} from "@/actions/recipes";
import RecipeCard from "../components/RecipeCard";
import { favoriteTable } from "@/db/schema";
import { db } from "@/index";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; search?: string }>;
}) {
  // TODO: add real images
  const { tag, search } = await searchParams;
  const favorites = await db.select().from(favoriteTable);
  const favoriteIds = new Set(
    favorites.map((f: { recipeId: number }) => f.recipeId),
  );

  const recipes = search
    ? await searchRecipesByName(search)
    : tag
      ? await getRecipesByTag(tag)
      : await getAllRecipes();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-6">
      {recipes && recipes.length > 0 ? (
        recipes.map(async (recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            description={recipe.description}
            cookTime={recipe.cookTime}
            servings={recipe.servings}
            imageUrl={recipe.imageUrl ? recipe.imageUrl : ""}
            tags={recipe.recipeTags.map((rt) => rt.tag)}
            isFavorited={favoriteIds.has(recipe.id)}
            toggleFavorite={toggleRecipeFavorite}
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
