import Calendar from "../components/meal-planning/Calendar";
import CurrentMonth from "../components/meal-planning/CurrentMonth";
import DaySelector from "../components/meal-planning/DaySelector";
import MealPlanningClient from "../components/meal-planning/MealPlanningClient";

export default async function MealPlanning() {
  // const handleEventClick = (event) => {
  //   const date = event.startStr;
  //   const title = event.title;
  //   const id = event.id;

  //   console.log(date);
  //   console.log(title);
  //   console.log(id);
  // };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Meal Planner</h1>
      <MealPlanningClient />

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-screen">
        <div className="w-full h-full">
          <Calendar eventClick={handleEventClick} />
        </div>

        <div className="flex flex-col items-stretch justify-start gap-4">
          <DaySelector />
          <CurrentMonth />
        </div>
      </div> */}
    </div>
  );
}
