import React, { useEffect, useState } from "react"
import { useParams, useNavigate, useSearchParams } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import EventSection from "../components/EventSection"
import Loader from "../components/Loader"
import SEO from "../components/SEO"
import Breadcrumbs from "../components/Breadcrumbs"

const EVENTS_PER_PAGE = 9

// Check if event is happening today
const isEventToday = (eventDate) => {
  const today = new Date()
  const eventDateObj = new Date(eventDate)

  return (
    today.getFullYear() === eventDateObj.getFullYear() &&
    today.getMonth() === eventDateObj.getMonth() &&
    today.getDate() === eventDateObj.getDate()
  )
}

export default function AllEventsPage() {
  const { page = 1 } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalEvents, setTotalEvents] = useState(0)

  const town = searchParams.get("town")
  const today = searchParams.get("today")

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true)
      const now = new Date().toISOString()
      const start = (parseInt(page) - 1) * EVENTS_PER_PAGE
      const end = start + EVENTS_PER_PAGE - 1

      // Build filters
      let filters = [["start_time", "gt", now]]
      if (town) {
        filters.push(["town", "eq", town])
      }
      if (today === "true") {
        const todayStart = new Date()
        todayStart.setHours(0, 0, 0, 0)
        const todayEnd = new Date()
        todayEnd.setHours(23, 59, 59, 999)
        filters.push(["start_time", "gte", todayStart.toISOString()])
        filters.push(["start_time", "lte", todayEnd.toISOString()])
      }

      // Fetch total count (separate query)
      let countQuery = supabase
        .from("events")
        .select("*", { count: "exact", head: true })
      filters.forEach(([col, op, val]) => {
        countQuery = countQuery[op](col, val)
      })
      const { count } = await countQuery

      // Fetch paginated events (separate query)
      let dataQuery = supabase.from("events").select("*")
      filters.forEach(([col, op, val]) => {
        dataQuery = dataQuery[op](col, val)
      })
      const { data, error } = await dataQuery
        .order("start_time", { ascending: true })
        .range(start, end)

      if (!error) {
        setEvents(data)
        setTotalEvents(count)
      } else {
        console.error("Database error:", error)
      }
      setLoading(false)
    }
    fetchEvents()
  }, [page, town, today])

  const totalPages = Math.ceil(totalEvents / EVENTS_PER_PAGE)

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams)
    navigate(`/events/${newPage}?${params.toString()}`)
  }

  const handleTownFilter = (selectedTown) => {
    const params = new URLSearchParams()
    params.set("town", selectedTown)
    navigate(`/events/1?${params.toString()}`)
  }

  const handleTodayFilter = () => {
    const params = new URLSearchParams()
    params.set("today", "true")
    if (town) params.set("town", town)
    navigate(`/events/1?${params.toString()}`)
  }

  const clearFilters = () => {
    navigate("/events/1")
  }

  // Generate SEO title and description based on filters
  const getSEOTitle = () => {
    if (today === "true") {
      return "Events Happening Today in the Hamptons"
    }
    if (town) {
      return `Events in ${town}, Hamptons - Things to Do Today`
    }
    return "All Events in the Hamptons - Things to Do & Activities"
  }

  const getSEODescription = () => {
    if (today === "true") {
      return `Discover events happening today in the Hamptons. From art galleries to beach activities, find the best things to do right now in East Hampton, Southampton, Montauk and more.`
    }
    if (town) {
      return `Find the best events and things to do in ${town}, Hamptons. Browse upcoming activities, restaurants, art galleries, and attractions in ${town}.`
    }
    return "Browse all events and activities in the Hamptons. From East Hampton to Montauk, discover the best things to do, restaurants, art galleries, and attractions."
  }

  const getSEOKeywords = () => {
    let keywords =
      "hamptons events, things to do in the hamptons, hamptons activities"
    if (today === "true") {
      keywords += ", events today hamptons, things to do today hamptons"
    }
    if (town) {
      keywords += `, ${town} events, things to do in ${town}, ${town} hamptons`
    }
    return keywords
  }

  if (loading) return <Loader />

  return (
    <>
      <SEO
        title={getSEOTitle()}
        description={getSEODescription()}
        keywords={getSEOKeywords()}
        url="/events"
      />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Header with filters */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {today === "true"
              ? "🔥 Events Happening Today"
              : town
                ? `Events in ${town}`
                : "All Events"}
          </h1>

          {/* Filter indicators and controls */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {today === "true" && (
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                🔥 Today Only
              </span>
            )}
            {town && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                📍 {town}
              </span>
            )}

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleTodayFilter}
                className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors"
              >
                🔥 Show Today's Events
              </button>

              {(town || today === "true") && (
                <button
                  onClick={clearFilters}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Quick town filters */}
          {!town && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Quick filters:
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "East Hampton",
                  "Southampton",
                  "Montauk",
                  "Sag Harbor",
                  "Bridgehampton",
                ].map((townName) => (
                  <button
                    key={townName}
                    onClick={() => handleTownFilter(townName)}
                    className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-50 hover:border-gray-400 transition-colors"
                  >
                    {townName}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <EventSection
          title=""
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
            <div className="text-6xl mb-4">🎭</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No events found
            </h2>
            <p className="text-gray-600 mb-6">
              {today === "true"
                ? "No events are happening today. Check out upcoming events instead!"
                : town
                  ? `No events found in ${town}. Try browsing all events or check other towns.`
                  : "No events found. Please try adjusting your filters."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={clearFilters}
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
      </div>
    </>
  )
}
