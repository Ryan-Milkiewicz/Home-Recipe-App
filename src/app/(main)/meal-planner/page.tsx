import { eq, gte, lte, and } from "drizzle-orm";
import { eventsTable, recipeTable } from "@/db/schema";
import MealPlanningClient from "../components/meal-planning/MealPlanningClient";
import { db } from "@/index";

export default async function MealPlanning() {
  // For recipe combobox dropdown
  const recipes = await db
    .select({
      id: recipeTable.id,
      title: recipeTable.title,
    })
    .from(recipeTable);

  // To populate calendar meal planner
  const events = await db
    .select({
      id: eventsTable.id,
      title: recipeTable.title,
      date: eventsTable.date,
    })
    .from(eventsTable)
    .innerJoin(recipeTable, eq(eventsTable.recipeId, recipeTable.id));

  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    .toISOString()
    .split("T")[0];

  // Gets monthly meals
  const monthlyMealsQuery = await db
    .select({
      id: eventsTable.id,
      title: recipeTable.title,
      date: eventsTable.date,
    })
    .from(eventsTable)
    .innerJoin(recipeTable, eq(eventsTable.recipeId, recipeTable.id))
    .where(and(gte(eventsTable.date, firstDay), lte(eventsTable.date, lastDay)))
    .orderBy(eventsTable.date);

  // Map over date to get the day from it
  const monthlyMeals = monthlyMealsQuery.map((r) => ({
    ...r,
    day: new Date(r.date).getUTCDate(),
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Meal Planner</h1>
      <MealPlanningClient
        events={events}
        recipes={recipes}
        monthlyMeals={monthlyMeals}
      />
    </div>
  );
}
