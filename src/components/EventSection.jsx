// src/components/EventSection.jsx
import React from "react"
import EventCard from "./EventCard"
import Pagination from "./Pagination"

export default function EventSection({
  title,
  events,
  buttonLabel,
  onButtonClick,
  showPagination = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalEvents = 0,
  eventsPerPage = 9,
}) {
  // Debug EventSection props
  console.log(
    `EventSection Debug - showPagination: ${showPagination}, currentPage: ${currentPage}, totalPages: ${totalPages}, totalEvents: ${totalEvents}`
  )
  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {buttonLabel && (
          <div className="flex justify-end">
            <button
              onClick={onButtonClick}
              className="group inline-flex items-center justify-center px-7 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg shadow-md hover:from-blue-700 hover:to-blue-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              {buttonLabel}
              <span className="ml-2 text-xl transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Results count */}
      {showPagination && totalEvents > 0 && (
        <div className="mb-4 text-sm text-gray-600">
          Showing {(currentPage - 1) * eventsPerPage + 1} to{" "}
          {Math.min(currentPage * eventsPerPage, totalEvents)} of {totalEvents}{" "}
          {totalEvents === 1 ? "event" : "events"}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {showPagination && totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  )
}
