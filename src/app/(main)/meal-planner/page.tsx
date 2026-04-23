import Calendar from "../components/meal-planning/Calendar";
import CurrentMonth from "../components/meal-planning/CurrentMonth";
import DaySelector from "../components/meal-planning/DaySelector";

export default async function MealPlanning() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Meal Planner</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-screen">
        <div className="w-full h-full">
          <Calendar />
        </div>

        <div className="flex flex-col items-stretch justify-start gap-4">
          <DaySelector />
          <CurrentMonth />
        </div>
      </div>
    </div>
  );
}
