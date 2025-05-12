// src/components/EventSection.jsx
import React from "react";
import EventCard from "./EventCard";

export default function EventSection({ title, events, buttonLabel }) {
  if (!events.length) return null;
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">
          {buttonLabel}
        </button>
      </div>
      <div className="flex flex-wrap gap-6">
        {events.slice(0, 3).map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}