"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import { Event } from "./MealPlanningClient";

type Props = {
  events: Event[];
  onEventClick: (event: Event) => void;
  onDateClick: (dateStr: string) => void;
};

export default function Calendar({ events, onEventClick, onDateClick }: Props) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  //const handleDateClick = (arg) => {};

  //   const handleEventClick = (event) => {
  //     const date = event.startStr;
  //     const title = event.title;
  //     const id = event.id;
  //   };

  return (
    <div className="w-full h-full rounded-2xl border border-border overflow-hidden [&_.fc]:p-4 [&_.fc-toolbar-title]:text-lg [&_.fc-toolbar-title]:font-semibold [&_.selected-day]:bg-muted">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="100%"
        dateClick={(arg) => {
          setSelectedDate(arg.dateStr);
          onDateClick(arg.dateStr);
        }}
        eventClick={(arg) => {
          setSelectedDate(arg.event.startStr.split("T")[0]);
          onEventClick({
            id: arg.event.id,
            title: arg.event.title,
            date: arg.event.startStr,
          });
          //onEventClick(arg.event);
        }}
        // eventClick={(arg) => onEventClick(arg.event)}
        // dateClick={onDateClick}
        dayCellClassNames={(arg) =>
          arg.date.toISOString().split("T")[0] === selectedDate
            ? ["selected-day"]
            : []
        }
        headerToolbar={{
          left: "",
          center: "title",
          right: "today prev next",
        }}
        events={events}
        // events={[
        //   { id: "1", title: "Pizza", date: "2026-04-24" },
        //   { id: "2", title: "Steak", date: "2026-04-23" },
        // ]}
      />
    </div>
  );
}
