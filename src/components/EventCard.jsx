// src/components/EventCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <Link to={`/event/${event.slug}`} className="block hover:shadow-lg transition">
      <div className="bg-white rounded-xl shadow p-4 flex flex-col w-full max-w-xs">
        {event.image_url && (
          <img
            src={event.image_url}
            alt={event.title}
            className="rounded-lg mb-3 h-40 object-cover"
          />
        )}
        <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
        <p className="text-gray-600 text-sm flex-1 mb-2">
          {event.description?.slice(0, 100)}...
        </p>
        <div className="text-pink-600 text-xs font-medium mt-auto">
          {new Date(event.start_time).toLocaleString()} | {event.location}
        </div>
      </div>
    </Link>
  );
}