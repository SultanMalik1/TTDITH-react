import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import EventSection from "../components/EventSection"
import Loader from "../components/Loader"
import SEO from "../components/SEO"
import Breadcrumbs from "../components/Breadcrumbs"

const EVENTS_PER_PAGE = 9

// Town information and descriptions
const TOWN_INFO = {
  "east-hampton": {
    name: "East Hampton",
    displayName: "East Hampton",
    description:
      "Discover the best events and activities in East Hampton, Hamptons. From world-class art galleries to pristine beaches, East Hampton offers a perfect blend of culture and natural beauty.",
    highlights: ["Art Galleries", "Beaches", "Fine Dining", "Shopping"],
    image: "/images/east-hampton.jpg",
  },
  southampton: {
    name: "Southampton",
    displayName: "Southampton",
    description:
      "Explore events and attractions in Southampton, Hamptons. Known for its historic charm, beautiful beaches, and vibrant social scene.",
    highlights: ["Historic District", "Beaches", "Tennis", "Golf"],
    image: "/images/southampton.jpg",
  },
  montauk: {
    name: "Montauk",
    displayName: "Montauk",
    description:
      "Experience the unique events and activities in Montauk, the easternmost point of Long Island. From surfing to fishing, Montauk offers authentic coastal experiences.",
    highlights: ["Surfing", "Fishing", "Lighthouse", "Beaches"],
    image: "/images/montauk.jpg",
  },
  "sag-harbor": {
    name: "Sag Harbor",
    displayName: "Sag Harbor",
    description:
      "Find the best events in Sag Harbor, a charming historic whaling village with a vibrant arts scene and excellent dining options.",
    highlights: ["Historic Village", "Art Scene", "Dining", "Marina"],
    image: "/images/sag-harbor.jpg",
  },
  bridgehampton: {
    name: "Bridgehampton",
    displayName: "Bridgehampton",
    description:
      "Discover events and activities in Bridgehampton, known for its equestrian culture, polo matches, and beautiful countryside.",
    highlights: ["Polo", "Equestrian", "Farms", "Wineries"],
    image: "/images/bridgehampton.jpg",
  },
  "water-mill": {
    name: "Water Mill",
    displayName: "Water Mill",
    description:
      "Explore the events and attractions in Water Mill, a peaceful hamlet known for its historic windmill and beautiful landscapes.",
    highlights: ["Historic Windmill", "Farms", "Nature", "Peaceful Setting"],
    image: "/images/water-mill.jpg",
  },
  amagansett: {
    name: "Amagansett",
    displayName: "Amagansett",
    description:
      "Find events and activities in Amagansett, a charming village with beautiful beaches and a relaxed, artistic atmosphere.",
    highlights: ["Beaches", "Art Scene", "Farming", "Relaxed Vibe"],
    image: "/images/amagansett.jpg",
  },
}

export default function TownPage() {
  const { townSlug, page: pathPage } = useParams()
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalEvents, setTotalEvents] = useState(0)

  // Handle both query parameter and path parameter for page
  const queryParams = new URLSearchParams(window.location.search)
  const queryPage = queryParams.get("page")
  const page = parseInt(pathPage || queryPage || 1)
  const today = queryParams.get("today")
  const townInfo = TOWN_INFO[townSlug]
  const townName = townInfo?.name || townSlug

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true)
      const now = new Date().toISOString()
      const start = (parseInt(page) - 1) * EVENTS_PER_PAGE
      const end = start + EVENTS_PER_PAGE - 1

      // Build filters
      let filters = [
        ["town", "eq", townName],
        ["start_time", "gt", now],
      ]
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
      }
      setLoading(false)
    }
    fetchEvents()
  }, [townName, page, today])

  const totalPages = Math.ceil(totalEvents / EVENTS_PER_PAGE)

  // Debug pagination values
  console.log(
    `Pagination Debug - totalEvents: ${totalEvents}, EVENTS_PER_PAGE: ${EVENTS_PER_PAGE}, totalPages: ${totalPages}, currentPage: ${page}`
  )

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams()
    params.set("page", newPage.toString())
    if (today === "true") params.set("today", "true")
    navigate(`/towns/${townSlug}?${params.toString()}`)
  }

  const handleTodayFilter = () => {
    navigate(`/towns/${townSlug}?page=1&today=true`)
  }

  const clearFilters = () => {
    navigate(`/towns/${townSlug}?page=1`)
  }

  // Generate SEO content
  const getSEOTitle = () => {
    if (today === "true") {
      return `Events Happening Today in ${townInfo?.displayName}, Hamptons`
    }
    return `Events in ${townInfo?.displayName}, Hamptons - Things to Do & Activities`
  }

  const getSEODescription = () => {
    if (today === "true") {
      return `Discover events happening today in ${townInfo?.displayName}, Hamptons. Find the best things to do right now in ${townInfo?.displayName}.`
    }
    return (
      townInfo?.description ||
      `Find the best events and things to do in ${townInfo?.displayName}, Hamptons. Browse upcoming activities, restaurants, art galleries, and attractions.`
    )
  }

  const getSEOKeywords = () => {
    let keywords = `${townInfo?.displayName} events, things to do in ${townInfo?.displayName}, ${townInfo?.displayName} hamptons`
    if (today === "true") {
      keywords += `, events today ${townInfo?.displayName}, things to do today ${townInfo?.displayName}`
    }
    keywords += `, ${townInfo?.displayName} activities, ${townInfo?.displayName} restaurants, ${townInfo?.displayName} art galleries`
    return keywords
  }

  if (loading) return <Loader />

  if (!townInfo) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Town Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The town you're looking for doesn't exist in our database.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO
        title={getSEOTitle()}
        description={getSEODescription()}
        keywords={getSEOKeywords()}
        url={`/towns/${townSlug}`}
      />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Town Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Events in {townInfo.displayName}
          </h1>

          <p className="text-lg text-gray-600 mb-6 max-w-3xl">
            {townInfo.description}
          </p>

          {/* Town Highlights */}
          <div className="flex flex-wrap gap-2 mb-6">
            {townInfo.highlights.map((highlight, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {highlight}
              </span>
            ))}
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {today === "true" && (
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                🔥 Today Only
              </span>
            )}

            <button
              onClick={handleTodayFilter}
              className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors"
            >
              🔥 Show Today's Events
            </button>

            {today === "true" && (
              <button
                onClick={clearFilters}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Events Section */}
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
            <div className="text-6xl mb-4">🏖️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No events found in {townInfo.displayName}
            </h2>
            <p className="text-gray-600 mb-6">
              {today === "true"
                ? `No events are happening today in ${townInfo.displayName}. Check out upcoming events instead!`
                : `No events found in ${townInfo.displayName}. Try browsing all events or check other towns.`}
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

        {/* Related Towns */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">
            Explore Other Hamptons Towns
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries(TOWN_INFO)
              .filter(([slug]) => slug !== townSlug)
              .slice(0, 6)
              .map(([slug, info]) => (
                <button
                  key={slug}
                  onClick={() => navigate(`/towns/${slug}?page=1`)}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all text-left"
                >
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {info.displayName}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {info.highlights.slice(0, 2).join(", ")}
                  </p>
                </button>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
