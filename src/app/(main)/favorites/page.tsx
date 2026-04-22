import { getFavoriteRecipes, toggleRecipeFavorite } from "@/actions/recipes";
import RecipeCard from "../components/RecipeCard";

export default async function FavoritesPage() {
  const favorites = await getFavoriteRecipes();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-muted-foreground">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              {...recipe}
              isFavorited={true}
              toggleFavorite={toggleRecipeFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
