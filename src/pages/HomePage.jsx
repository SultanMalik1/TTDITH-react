import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import EventSection from "../components/EventSection"
import Loader from "../components/Loader"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import sponsors from "../sponsors/data/sponsors.json"
import SponsorCard from "../sponsors/components/SponsorCard"

const CATEGORIES = [
  "Nature",
  "Government",
  "Arts",
  "Music",
  "Restaurant",
  "Community",
  "Film",
  "Library",
  "Health",
  "Nightlife",
  "Spiritual",
]

function groupEventsByCategory(events) {
  const grouped = {}
  CATEGORIES.forEach((cat) => {
    grouped[cat] = []
  })
  events.forEach((event) => {
    if (grouped[event.category]) {
      grouped[event.category].push(event)
    }
  })
  return grouped
}

export default function HomePage() {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null)

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true)
      const now = new Date().toISOString()
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gt("start_time", now)
        .order("start_time", { ascending: true })
      if (!error) setEvents(data)
      setLoading(false)
    }
    fetchEvents()
  }, [])

  const groupedEvents = groupEventsByCategory(events)

  const handleCategoryClick = (category) => {
    navigate(`/categories/${category}/1`)
  }

  const handleAllEventsClick = () => {
    navigate("/events/1")
  }

  const handleDateSubmit = () => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0]
      navigate(`/events/date/${formattedDate}`)
    }
  }

  const handleViewAllSponsors = () => {
    navigate("/sponsors")
  }

  if (loading) return <Loader />

  // Filter featured events (adjust category as needed)
  const featuredEvents = events.filter((e) => e.category === "Featured")

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Featured Events Section */}
      {featuredEvents.length > 0 && (
        <EventSection
          title="Featured Events"
          events={featuredEvents.slice(0, 3)}
          buttonLabel="View all featured events"
          onButtonClick={() => navigate("/featured")}
        />
      )}

      <div></div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <span className="text-lg font-medium text-gray-800">
                {category}
              </span>
              <span className="text-sm text-gray-600 mt-1">
                {groupedEvents[category]?.length || 0} events
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <label className="font-medium">Select Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM d, yyyy"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="Choose a date"
          />
        </div>
        <button
          onClick={handleDateSubmit}
          disabled={!selectedDate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          View Events
        </button>
      </div>
      <EventSection
        title="Upcoming Events"
        events={events.slice(0, 3)}
        buttonLabel="All events "
        onButtonClick={handleAllEventsClick}
      />
      {/* {CATEGORIES.map((category) =>
        groupedEvents[category]?.length ? (
          <EventSection
            key={category}
            title={`${category} Events`}
            events={groupedEvents[category].slice(0, 3)}
            buttonLabel={`All ${category.toLowerCase()} events`}
            onButtonClick={() => handleCategoryClick(category)}
          />
        ) : null
      )} */}
      {/* Oceanside Sponsors Section */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Our Sponsors</h2>
          <button
            onClick={handleViewAllSponsors}
            className="bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-800 transition-colors flex items-center gap-2"
          >
            View all
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sponsors
            .filter((s) => s.category === "oceanside")
            .map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
        </div>
      </div>
    </div>
  )
}
