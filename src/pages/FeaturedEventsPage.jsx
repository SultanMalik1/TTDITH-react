import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import EventSection from "../components/EventSection"
import Loader from "../components/Loader"
import SEO from "../components/SEO"
import Breadcrumbs from "../components/Breadcrumbs"

const EVENTS_PER_PAGE = 9

export default function FeaturedEventsPage() {
  const { page = 1 } = useParams()
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalEvents, setTotalEvents] = useState(0)

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true)
      const now = new Date().toISOString()
      const start = (parseInt(page) - 1) * EVENTS_PER_PAGE
      const end = start + EVENTS_PER_PAGE - 1

      // Fetch total count
      const { count } = await supabase
        .from("events")
        .select("*", { count: "exact", head: true })
        .eq("category", "Featured")
        .gt("start_time", now)

      // Fetch paginated events
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("category", "Featured")
        .gt("start_time", now)
        .order("start_time", { ascending: true })
        .range(start, end)

      if (!error) {
        setEvents(data)
        setTotalEvents(count)
      }
      setLoading(false)
    }
    fetchEvents()
  }, [page])

  const totalPages = Math.ceil(totalEvents / EVENTS_PER_PAGE)

  const handlePageChange = (newPage) => {
    navigate(`/featured/${newPage}`)
  }

  if (loading) return <Loader />

  return (
    <>
      <SEO
        title="Featured Events in the Hamptons - Premium Activities & Attractions"
        description="Discover the best featured events and premium activities in the Hamptons. From exclusive art exhibitions to special dining experiences, find the most noteworthy events."
        keywords="featured events hamptons, premium activities hamptons, exclusive events hamptons, hamptons featured activities, best events hamptons"
        url="/featured"
      />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Featured Events Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            Featured Events
          </h1>

          <p className="text-lg text-gray-600 mb-6 max-w-3xl">
            Discover the most noteworthy and premium events across the Hamptons.
            These featured events represent the best activities, exhibitions,
            and experiences available.
          </p>

          {/* Featured highlights */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
              ⭐ Featured
            </span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              📍 Hamptons
            </span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
              🎯 {totalEvents} {totalEvents === 1 ? "event" : "events"}
            </span>
          </div>
        </div>

        <EventSection
          title="Featured Events"
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
            <div className="text-6xl mb-4">⭐</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No featured events found
            </h2>
            <p className="text-gray-600 mb-6">
              No featured events are currently scheduled. Check back soon for
              new featured events or browse all events.
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
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Back to Homepage
              </button>
            </div>
          </div>
        )}

        {/* Back button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg transition-colors font-semibold"
          >
            ← Back
          </button>
        </div>
      </div>
    </>
  )
}
