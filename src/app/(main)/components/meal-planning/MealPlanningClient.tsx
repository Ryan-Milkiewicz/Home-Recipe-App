"use client";
import { useState } from "react";
import Calendar from "./Calendar";
import DaySelector from "./DaySelector";
import CurrentMonth from "./CurrentMonth";
import { saveEvent } from "@/actions/events";

export type Event = {
  id?: number;
  title: string;
  //date: Date;
  date: string;
};

type Recipe = { id: number; title: string };

type Props = {
  events: Event[];
  recipes: Recipe[];
  //onSave: (event: Event) => void;
};

export default function MealPlanningClient({ events, recipes }: Props) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  // const [events, setEvents] = useState<Event[]>([
  //   { id: "1", title: "Pizza", date: "2026-04-24" },
  //   { id: "2", title: "Steak", date: "2026-04-23" },
  // ]);

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-screen">
      <div className="w-full h-full">
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
        <CurrentMonth />
      </div>
    </div>
  );
}
