// src/components/EventSection.jsx
import React from "react";
import EventCard from "./EventCard";

export default function EventSection({ 
  title, 
  events, 
  buttonLabel, 
  onButtonClick,
  showPagination = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange
}) {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {buttonLabel && (
          <button
            onClick={onButtonClick}
            className="bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-800 transition-colors flex items-center gap-2 w-full sm:w-auto text-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            {buttonLabel}
            <span aria-hidden="true">→</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {showPagination && totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}