import { recipeTable } from "@/db/schema";
import MealPlanningClient from "../components/meal-planning/MealPlanningClient";
import { db } from "@/index";

export default async function MealPlanning() {
  const recipes = await db
    .select({
      id: recipeTable.id,
      title: recipeTable.title,
    })
    .from(recipeTable);

  console.log(recipes);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Meal Planner</h1>
      <MealPlanningClient recipes={recipes} />
    </div>
  );
}
