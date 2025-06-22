// src/components/EventCard.jsx
import React from "react"
import { Link } from "react-router-dom"

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "America/New_York",
    })
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/New_York",
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
      {/* Image Container with Fixed Aspect Ratio */}
      <div className="relative h-48 overflow-hidden">
        {event.image_url ? (
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">🎉</div>
              <div className="text-sm font-medium">Event Image</div>
            </div>
          </div>
        )}

        {/* Category Badge */}
        {event.category && (
          <div className="absolute top-3 left-3">
            <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
              {event.category}
            </span>
          </div>
        )}

        {/* Date Badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
            {formatDate(event.start_time)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          <Link to={`/event/${event.slug}`} className="hover:underline">
            {event.title}
          </Link>
        </h3>

        {/* Time and Location */}
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <span className="mr-3">🕒 {formatTime(event.start_time)}</span>
          {event.town && <span>📍 {event.town}</span>}
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {event.description}
        </p>

        {/* Tags and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {event.cost && (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                {event.cost}
              </span>
            )}
            {event.venue_name && (
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                {event.venue_name}
              </span>
            )}
          </div>

          <Link
            to={`/event/${event.slug}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventCard
