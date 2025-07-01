import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import Loader from "../components/Loader"
import SEO from "../components/SEO"

export default function EventDetailPage() {
  const { slug } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

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

  // Function to truncate text to 4 lines
  const truncateToLines = (text, lines = 4) => {
    const words = text.split(" ")
    const lineHeight = 1.5 // Approximate line height in rem
    const maxHeight = lines * lineHeight

    // Create a temporary element to measure text height
    const temp = document.createElement("div")
    temp.style.cssText = `
      position: absolute;
      visibility: hidden;
      white-space: pre-wrap;
      word-wrap: break-word;
      line-height: ${lineHeight}rem;
      font-size: 1rem;
      max-width: 100%;
    `
    temp.textContent = text
    document.body.appendChild(temp)

    const fullHeight = temp.scrollHeight
    document.body.removeChild(temp)

    if (fullHeight <= maxHeight * 16) {
      // Convert rem to px (16px base)
      return { text, isTruncated: false }
    }

    // Binary search to find the right number of words
    let start = 0
    let end = words.length
    let result = words.slice(0, Math.floor(words.length * 0.7)).join(" ") // Start with 70%

    while (start <= end) {
      const mid = Math.floor((start + end) / 2)
      const testText = words.slice(0, mid).join(" ")

      temp.style.cssText = `
        position: absolute;
        visibility: hidden;
        white-space: pre-wrap;
        word-wrap: break-word;
        line-height: ${lineHeight}rem;
        font-size: 1rem;
        max-width: 100%;
      `
      temp.textContent = testText
      document.body.appendChild(temp)

      const testHeight = temp.scrollHeight
      document.body.removeChild(temp)

      if (
        testHeight <= maxHeight * 16 &&
        testHeight > (maxHeight - lineHeight) * 16
      ) {
        result = testText
        break
      } else if (testHeight > maxHeight * 16) {
        end = mid - 1
      } else {
        start = mid + 1
        result = testText
      }
    }

    return { text: result, isTruncated: true }
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

  const { text: truncatedText, isTruncated } = truncateToLines(
    event.description
  )

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

          {/* Actions Bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
            {/* Visit Website Button */}
            {event.url && (
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-base font-semibold hover:bg-indigo-700 transition shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Visit Event Website
                <span className="ml-2">→</span>
              </a>
            )}

            {/* Social Sharing */}
            <div className="flex-grow flex items-center justify-center sm:justify-end gap-2">
              <span className="text-sm font-medium text-gray-500 mr-2 hidden md:inline">
                Share:
              </span>
              <button
                onClick={() => handleShare("facebook")}
                className="bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-colors duration-200 rounded-full h-10 w-10 flex items-center justify-center"
                aria-label="Share on Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.630.771-1.630 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="bg-gray-100 text-gray-600 hover:bg-sky-500 hover:text-white transition-colors duration-200 rounded-full h-10 w-10 flex items-center justify-center"
                aria-label="Share on Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </button>
              <button
                onClick={() => handleShare("linkedin")}
                className="bg-gray-100 text-gray-600 hover:bg-blue-700 hover:text-white transition-colors duration-200 rounded-full h-10 w-10 flex items-center justify-center"
                aria-label="Share on LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </button>
              <button
                onClick={copyToClipboard}
                className="bg-gray-100 text-gray-600 hover:bg-purple-600 hover:text-white transition-colors duration-200 rounded-full h-10 w-10 flex items-center justify-center"
                aria-label="Copy link"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
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

        {/* Event Description with Interactive Truncation */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Event Description
          </h2>
          <div className="relative">
            <div
              className={`prose prose-lg max-w-none transition-all duration-300 ease-in-out ${
                !isDescriptionExpanded ? "overflow-hidden" : ""
              }`}
              style={{
                maxHeight: !isDescriptionExpanded ? "6rem" : "none",
                lineHeight: "1.5rem",
              }}
            >
              <p className="text-gray-800 leading-relaxed m-0">
                {!isDescriptionExpanded ? truncatedText : event.description}
              </p>
            </div>

            {/* Gradient overlay for truncated text */}
            {!isDescriptionExpanded && isTruncated && (
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            )}

            {/* Read More/Less Button */}
            {isTruncated && (
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 group"
              >
                <span>{isDescriptionExpanded ? "Show Less" : "Read More"}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDescriptionExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            )}
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
      </div>
    </>
  )
}
