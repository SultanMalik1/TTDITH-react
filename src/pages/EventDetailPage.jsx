import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import Loader from "../components/Loader"
import SEO from "../components/SEO"

export default function EventDetailPage() {
  const { slug } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true)
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("slug", slug)
        .single()
      if (!error) setEvent(data)
      setLoading(false)
    }
    fetchEvent()
  }, [slug])

  const handleShare = (platform) => {
    const url = window.location.href
    const title = event?.title || "Check out this event in the Hamptons!"

    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`
        break
      default:
        return
    }

    window.open(shareUrl, "_blank", "width=600,height=400")
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  if (loading) return <Loader />
  if (!event) return <div className="text-center py-20">Event not found.</div>

  const eventDate = new Date(event.start_time)
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/New_York",
  })

  return (
    <>
      <SEO
        title={event.title}
        description={event.description}
        image={event.image_url}
        url={`/event/${event.slug}`}
        type="article"
        keywords={`${event.title}, ${event.category}, ${event.town}, hamptons events, things to do in the hamptons`}
        publishedTime={event.start_time}
        section={event.category}
        tags={[event.category, event.town, "hamptons", "events"]}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Event Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {event.title}
          </h1>

          {/* Event Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center">
              <span className="mr-2 text-xl">📅</span>
              <span className="font-medium">
                {formattedDate} at {formattedTime}
              </span>
            </div>

            {event.town && (
              <div className="flex items-center">
                <span className="mr-2 text-xl">📍</span>
                <span className="font-medium">{event.town}</span>
              </div>
            )}

            {event.venue_name && (
              <div className="flex items-center">
                <span className="mr-2 text-xl">🏢</span>
                <span className="font-medium">{event.venue_name}</span>
              </div>
            )}
          </div>

          {/* Category and Cost Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {event.category && (
              <span className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                <span className="mr-1">🏷️</span>
                {event.category}
              </span>
            )}
            {event.cost && (
              <span className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                <span className="mr-1">💰</span>
                {event.cost}
              </span>
            )}
          </div>

          {/* Social Sharing Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-sm font-medium text-gray-700">
              Share this event:
            </span>
            <button
              onClick={() => handleShare("facebook")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition flex items-center gap-2"
            >
              <span>📘</span> Facebook
            </button>
            <button
              onClick={() => handleShare("twitter")}
              className="bg-sky-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-sky-600 transition flex items-center gap-2"
            >
              <span>🐦</span> Twitter
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition flex items-center gap-2"
            >
              <span>💼</span> LinkedIn
            </button>
            <button
              onClick={copyToClipboard}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition flex items-center gap-2"
            >
              <span>🔗</span> Copy Link
            </button>
          </div>
        </div>

        {/* Event Image */}
        {event.image_url && (
          <div className="mb-8">
            <img
              src={event.image_url}
              alt={event.title}
              className="rounded-xl w-full h-96 object-cover shadow-lg"
            />
          </div>
        )}

        {/* Event Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Event Description
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-800 leading-relaxed">{event.description}</p>
          </div>
        </div>

        {/* Event Details */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">
            Event Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {event.address && (
              <div className="flex items-start">
                <span className="mr-3 text-xl">📍</span>
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-700">{event.address}</p>
                </div>
              </div>
            )}

            {event.registration_url && (
              <div className="flex items-start">
                <span className="mr-3 text-xl">🎫</span>
                <div>
                  <p className="font-medium text-gray-900">Registration</p>
                  <a
                    href={event.registration_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Register for this event
                  </a>
                </div>
              </div>
            )}

            {event.contact_name && (
              <div className="flex items-start">
                <span className="mr-3 text-xl">👤</span>
                <div>
                  <p className="font-medium text-gray-900">Contact</p>
                  <p className="text-gray-700">{event.contact_name}</p>
                  {event.email && (
                    <a
                      href={`mailto:${event.email}`}
                      className="text-blue-600 hover:text-blue-800 underline block"
                    >
                      {event.email}
                    </a>
                  )}
                  {event.phone && (
                    <a
                      href={`tel:${event.phone}`}
                      className="text-blue-600 hover:text-blue-800 underline block"
                    >
                      {event.phone}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          {event.url && (
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
            >
              Visit Event Website
              <span className="ml-2">→</span>
            </a>
          )}
        </div>
      </div>
    </>
  )
}
