import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import EventSection from "../components/EventSection"
import Loader from "../components/Loader"
import SEO from "../components/SEO"
import Breadcrumbs from "../components/Breadcrumbs"

const EVENTS_PER_PAGE = 9

export default function DateFilteredEventsPage() {
  const { date, page = 1 } = useParams()
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalEvents, setTotalEvents] = useState(0)

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true)
      const start = (parseInt(page) - 1) * EVENTS_PER_PAGE
      const end = start + EVENTS_PER_PAGE - 1

      // Create date range for the selected date, accounting for timezone
      const selectedDate = new Date(date)
      const startDate = new Date(selectedDate)
      startDate.setUTCHours(0, 0, 0, 0)
      const endDate = new Date(selectedDate)
      endDate.setUTCHours(23, 59, 59, 999)

      // Fetch total count
      const { count } = await supabase
        .from("events")
        .select("*", { count: "exact", head: true })
        .gte("start_time", startDate.toISOString())
        .lte("start_time", endDate.toISOString())

      // Fetch paginated events
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("start_time", startDate.toISOString())
        .lte("start_time", endDate.toISOString())
        .order("start_time", { ascending: true })
        .range(start, end)

      if (!error) {
        setEvents(data)
        setTotalEvents(count)
      }
      setLoading(false)
    }
    fetchEvents()
  }, [date, page])

  const totalPages = Math.ceil(totalEvents / EVENTS_PER_PAGE)

  const handlePageChange = (newPage) => {
    navigate(`/events/date/${date}/${newPage}`)
  }

  if (loading) return <Loader />

  // Parse the date from URL (YYYY-MM-DD format)
  const [year, month, day] = date.split("-")
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const weekdayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  const dateObj = new Date(year, month - 1, day)
  const weekday = weekdayNames[dateObj.getDay()]
  const monthName = monthNames[month - 1]
  const formattedDate = `${weekday}, ${monthName} ${day}, ${year}`

  // Generate SEO content
  const getSEOTitle = () => {
    return `Events on ${formattedDate} in the Hamptons - Things to Do`
  }

  const getSEODescription = () => {
    return `Discover events and activities happening on ${formattedDate} in the Hamptons. Find the best things to do in East Hampton, Southampton, Montauk and more.`
  }

  const getSEOKeywords = () => {
    return `events ${formattedDate} hamptons, things to do ${formattedDate} hamptons, ${formattedDate} events east hampton, ${formattedDate} events southampton, hamptons events ${monthName} ${day}`
  }

  return (
    <>
      <SEO
        title={getSEOTitle()}
        description={getSEODescription()}
        keywords={getSEOKeywords()}
        url={`/events/date/${date}`}
      />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Date Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            Events on {formattedDate}
          </h1>

          <p className="text-lg text-gray-600 mb-6 max-w-3xl">
            Discover events and activities happening on {formattedDate} across
            the Hamptons. From East Hampton to Montauk, find the best things to
            do on this date.
          </p>

          {/* Date-specific highlights */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              📅 {formattedDate}
            </span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              📍 Hamptons
            </span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
              🎯 {totalEvents} events
            </span>
          </div>
        </div>

        <EventSection
          title={`Events on ${formattedDate}`}
          events={events}
          showPagination={true}
          currentPage={parseInt(page)}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalEvents={totalEvents}
          eventsPerPage={EVENTS_PER_PAGE}
        />

        {/* No events message */}
        {events.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No events on {formattedDate}
            </h2>
            <p className="text-gray-600 mb-6">
              No events are scheduled for {formattedDate}. Check other dates or
              browse all upcoming events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/events/1")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Browse All Events
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
              >
                Back to Homepage
              </button>
            </div>
          </div>
        )}

        {/* Related Dates */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">
            Explore Other Dates
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((daysAhead) => {
              const futureDate = new Date(dateObj)
              futureDate.setDate(futureDate.getDate() + daysAhead)
              const futureDateStr = futureDate.toISOString().split("T")[0]
              const futureFormatted = futureDate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })

              return (
                <button
                  key={daysAhead}
                  onClick={() => navigate(`/events/date/${futureDateStr}/1`)}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all text-left"
                >
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {futureFormatted}
                  </h4>
                  <p className="text-xs text-gray-600">Events</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
