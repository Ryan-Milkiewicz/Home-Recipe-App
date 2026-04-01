import RecipeCard from "../components/RecipeCard";

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-6">
      <RecipeCard
        id="1"
        title="Spaghetti carbonara"
        cookTime={30}
        servings={4}
        tag="Italian"
      />
      <RecipeCard
        id="2"
        title="Greek salad"
        cookTime={10}
        servings={2}
        tag="Vegetarian"
      />
      <RecipeCard
        id="3"
        title="Grilled chicken with vegetables"
        cookTime={10}
        servings={2}
        tag="Vegetarian"
      />
      <RecipeCard
        id="4"
        title="Steak with garlic butter"
        cookTime={10}
        servings={2}
        tag="meat"
      />
    </div>
  );
}
