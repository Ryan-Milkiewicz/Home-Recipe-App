"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Calendar() {
  return (
    <div className="w-full h-full rounded-2xl border border-border overflow-hidden [&_.fc]:p-4 [&_.fc-toolbar-title]:text-lg [&_.fc-toolbar-title]:font-semibold">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="100%"
        headerToolbar={{
          left: "",
          center: "title",
          right: "today prev next",
        }}
        events={[
          { id: "1", title: "Pizza", date: "2026-04-24" },
          { id: "2", title: "Steak", date: "2026-04-23" },
        ]}
      />
    </div>
  );
}
