// src/components/EventCard.jsx
import React from "react"
import { Link } from "react-router-dom"

export default function EventCard({ event }) {
  return (
    <Link
      to={`/event/${event.slug}`}
      className="group block bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-200 hover:scale-[1.025] focus:scale-[1.025] focus:outline-none"
      tabIndex={0}
    >
      {event.image_url && (
        <img
          src={event.image_url}
          alt={event.title}
          className="w-full h-48 object-cover rounded-t-2xl"
          loading="lazy"
        />
      )}
      <div className="p-6 flex flex-col h-full">
        <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2">
          {event.title}
        </h3>
        <p className="text-gray-700 text-base mb-4 line-clamp-3">
          {event.description}
        </p>
        <p className="text-pink-600">
          {new Date(event.start_time)
            .toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
              timeZone: "America/New_York",
            })
            .replace(",", " •")}{" "}
          | {event.location}
        </p>
      </div>
    </Link>
  )
}
