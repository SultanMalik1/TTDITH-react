import React from "react"

const SocialSharePreview = ({ event }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
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
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
      {/* Facebook/Twitter Preview */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Social Media Preview
        </h3>

        {/* Preview Card */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Image */}
          <div className="h-48 bg-gray-100 relative">
            {event.image_url ? (
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">🎉</div>
                  <div className="text-sm font-medium">Event Image</div>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h4 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
              {event.title}
            </h4>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {event.description}
            </p>

            {/* Event Details */}
            <div className="flex items-center text-gray-500 text-sm mb-3">
              <span className="mr-3">
                📅 {formatDate(event.start_time)} at{" "}
                {formatTime(event.start_time)}
              </span>
              {event.town && <span>📍 {event.town}</span>}
            </div>

            {/* URL */}
            <div className="text-blue-600 text-sm">
              thingstodointhehamptons.com
            </div>
          </div>
        </div>

        {/* Preview Info */}
        <div className="mt-4 text-xs text-gray-500 space-y-1">
          <div>✅ Optimized for Facebook, Twitter, and LinkedIn</div>
          <div>✅ Consistent image size (1200x630px)</div>
          <div>✅ Event details included in preview</div>
          <div>✅ Mobile-friendly sharing</div>
        </div>
      </div>
    </div>
  )
}

export default SocialSharePreview
