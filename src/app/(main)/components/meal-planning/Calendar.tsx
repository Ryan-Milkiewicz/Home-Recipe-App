"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import { Event } from "@/lib/types/event";

type Props = {
  events: Event[];
  onEventClick: (event: Event) => void;
  onDateClick: (dateStr: string) => void;
};

export default function Calendar({ events, onEventClick, onDateClick }: Props) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

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
            id: Number(arg.event.id),
            title: arg.event.title,
            date: arg.event.startStr,
          });
        }}
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
        events={events.map((e) => ({ ...e, id: String(e.id) }))}
      />
    </div>
  );
}
