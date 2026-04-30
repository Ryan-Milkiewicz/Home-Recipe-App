import { eq } from "drizzle-orm";
import { eventsTable, recipeTable } from "@/db/schema";
import MealPlanningClient from "../components/meal-planning/MealPlanningClient";
import { db } from "@/index";

export default async function MealPlanning() {
  const recipes = await db
    .select({
      id: recipeTable.id,
      title: recipeTable.title,
    })
    .from(recipeTable);

  const events = await db
    .select({
      id: eventsTable.id,
      title: recipeTable.title,
      date: eventsTable.date,
    })
    .from(eventsTable)
    .innerJoin(recipeTable, eq(eventsTable.recipeId, recipeTable.id));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Meal Planner</h1>
      <MealPlanningClient
        events={events}
        recipes={recipes}
        // onSave={handleSave}
      />
    </div>
  );
}
