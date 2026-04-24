import MealPlanningClient from "../components/meal-planning/MealPlanningClient";

export default async function MealPlanning() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Meal Planner</h1>
      <MealPlanningClient />
    </div>
  );
}
