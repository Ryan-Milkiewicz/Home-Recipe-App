"use client";
import Calendar from "./Calendar";
import CurrentMonth from "./CurrentMonth";
import DaySelector from "./DaySelector";
import { MonthlyMeals } from "@/lib/types/event";
import { Event } from "@/lib/types/event";
import { useState } from "react";
import { saveEvent } from "@/actions/events";

type Recipe = { id: number; title: string };

type Props = {
  events: Event[];
  recipes: Recipe[];
  monthlyMeals: MonthlyMeals[];
};

export default function MealPlanningClient({
  events,
  recipes,
  monthlyMeals,
}: Props) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setSelectedDate(event.date.split("T")[0]);
  };

  const handleDateClick = (dateStr: string) => {
    setSelectedEvent(null);
    setSelectedDate(dateStr);
  };

  const handleSave = async (recipeId: number) => {
    if (!selectedDate) return;
    console.log(recipeId, selectedDate);
    await saveEvent(recipeId, selectedDate);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:h-screen p-4">
      <div className="md:col-span-2 h-125 md:h-full">
        <Calendar
          events={events}
          onEventClick={handleEventClick}
          onDateClick={handleDateClick}
        />
      </div>
      <div className="flex flex-col items-stretch justify-start gap-4">
        <DaySelector
          key={selectedDate}
          title={selectedEvent?.title ?? ""}
          day={selectedDate ?? ""}
          recipes={recipes}
          onSave={handleSave}
        />
        <CurrentMonth monthlyMeals={monthlyMeals} />
      </div>
    </div>
  );
}
