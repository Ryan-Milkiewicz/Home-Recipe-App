"use client";
import { useState } from "react";
import Calendar from "./Calendar";
import DaySelector from "./DaySelector";
import CurrentMonth from "./CurrentMonth";

export default function MealPlanningClient() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState([
    { id: "1", title: "Pizza", date: "2026-04-24" },
    { id: "2", title: "Steak", date: "2026-04-23" },
  ]);

  //console.log(selectedEvent.title);
  //console.log(selectedEvent);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setSelectedDate(event.startStr.split("T")[0]);
  };

  const handleDateClick = (dateStr: string) => {
    setSelectedEvent(null);
    setSelectedDate(dateStr);
  };

  //   const handleDateClick = () => {
  //     setSelectedEvent(null);
  //   };

  const handleSave = (title: string) => {
    if (!selectedDate || !title.trim()) return;
    setEvents((prev) => [
      ...prev.filter((e) => e.date !== selectedDate), // replace if exists
      { id: selectedDate, title, date: selectedDate },
    ]);
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
        <DaySelector title={selectedEvent?.title ?? ""} onSave={handleSave} />
        <CurrentMonth />
      </div>
    </div>
  );
}
