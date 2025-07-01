import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import EventSection from "../components/EventSection"
import Loader from "../components/Loader"
import SEO from "../components/SEO"
import Breadcrumbs from "../components/Breadcrumbs"
import ReactGA from "react-ga4"

const EVENTS_PER_PAGE = 9

export default function CategoryPage() {
  const { category, page = 1 } = useParams()
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalEvents, setTotalEvents] = useState(0)

  useEffect(() => {
    // Track category view
    ReactGA.event({
      category: "Category View",
      action: "view_category",
      label: category,
      value: parseInt(page),
    })

    async function fetchEvents() {
      setLoading(true)
      const now = new Date().toISOString()
      const start = (parseInt(page) - 1) * EVENTS_PER_PAGE
      const end = start + EVENTS_PER_PAGE - 1

      // Fetch total count
      const { count } = await supabase
        .from("events")
        .select("*", { count: "exact", head: true })
        .eq("category", category)
        .gt("start_time", now)

      // Fetch paginated events
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("category", category)
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
  }, [category, page])

  const totalPages = Math.ceil(totalEvents / EVENTS_PER_PAGE)

  const handlePageChange = (newPage) => {
    navigate(`/categories/${category}/${newPage}`)
  }

  // Generate SEO content
  const getSEOTitle = () => {
    return `${category} Events in the Hamptons - Things to Do & Activities`
  }

  const getSEODescription = () => {
    return `Discover the best ${category.toLowerCase()} events and activities in the Hamptons. From East Hampton to Montauk, find ${category.toLowerCase()} events happening today and this weekend.`
  }

  const getSEOKeywords = () => {
    return `${category} events hamptons, ${category.toLowerCase()} activities hamptons, ${category.toLowerCase()} things to do hamptons, ${category.toLowerCase()} events east hampton, ${category.toLowerCase()} events southampton`
  }

  if (loading) return <Loader />

  return (
    <>
      <SEO
        title={getSEOTitle()}
        description={getSEODescription()}
        keywords={getSEOKeywords()}
        url={`/categories/${category}`}
      />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            {category} Events
          </h1>

          <p className="text-lg text-gray-600 mb-6 max-w-3xl">
            Discover the best {category.toLowerCase()} events and activities
            across the Hamptons. From East Hampton to Montauk, find{" "}
            {category.toLowerCase()} events happening today and this weekend.
          </p>

          {/* Category-specific highlights */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              🏷️ {category}
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
          title={`${category} Events`}
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
              No {category.toLowerCase()} events found
            </h2>
            <p className="text-gray-600 mb-6">
              No {category.toLowerCase()} events are currently scheduled. Check
              back soon for new events or browse other categories.
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

        {/* Related Categories */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">
            Explore Other Categories
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["Arts", "Music", "Restaurant", "Nature", "Community", "Film"].map(
              (cat) =>
                cat !== category && (
                  <button
                    key={cat}
                    onClick={() => navigate(`/categories/${cat}/1`)}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all text-left"
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">{cat}</h4>
                    <p className="text-xs text-gray-600">Events</p>
                  </button>
                )
            )}
          </div>
        </div>
      </div>
    </>
  )
}
