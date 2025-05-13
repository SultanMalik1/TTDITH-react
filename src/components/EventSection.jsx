// src/components/EventSection.jsx
import React from "react";
import { Link } from "react-router-dom";

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
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {buttonLabel}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link
            key={event.id}
            to={`/event/${event.slug}`}
            className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {event.image_url && (
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
              <p className="text-gray-600 text-sm mb-2">
                {new Date(event.start_time).toLocaleDateString()}
              </p>
              <p className="text-gray-700">{event.description}</p>
            </div>
          </Link>
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