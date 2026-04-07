import { db } from "@/index";
import RecipeCard from "../components/RecipeCard";

export default async function Page() {
  // TODO: add real images
  const recipes = await db.query.recipeTable.findMany({
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
  console.log(recipes);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          description={recipe.description}
          cookTime={recipe.cookTime}
          servings={recipe.servings}
          tags={recipe.recipeTags.map((rt) => rt.tag)}
        />
      ))}
    </div>
  );
}
