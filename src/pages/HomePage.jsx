import React, { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import EventSection from "../components/EventSection"
import Loader from "../components/Loader"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import sponsors from "../sponsors/data/sponsors.json"
import SponsorCard from "../sponsors/components/SponsorCard"
import SEO from "../components/SEO"

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

const HAMPTONS_TOWNS = [
  "East Hampton",
  "Southampton",
  "Montauk",
  "Sag Harbor",
  "Bridgehampton",
  "Water Mill",
  "Amagansett",
  "Wainscott",
  "Sagaponack",
  "Hampton Bays",
  "Westhampton",
  "Quogue",
  "East Quogue",
  "Remsenburg-Speonk",
  "Flanders",
  "Northampton",
  "Noyack",
  "Quiogue",
  "Tuckahoe",
  "Springs",
  "Shelter Island",
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

// Carousel Component
const Carousel = ({
  title,
  description,
  items,
  onItemClick,
  itemType = "town",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const itemsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 2 // mobile
      if (window.innerWidth < 1024) return 3 // tablet
      return 5 // desktop
    }
    return 5
  }

  const maxIndex = Math.max(0, items.length - itemsPerView())

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.scrollWidth / items.length
      carouselRef.current.scrollTo({
        left: index * itemWidth,
        behavior: "smooth",
      })
    }
    setCurrentIndex(index)
    setShowLeftArrow(index > 0)
    setShowRightArrow(index < maxIndex)
  }

  const scrollNext = () => {
    if (currentIndex < maxIndex) {
      scrollToIndex(currentIndex + 1)
    }
  }

  const scrollPrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const newMaxIndex = Math.max(0, items.length - itemsPerView())
      setShowLeftArrow(currentIndex > 0)
      setShowRightArrow(currentIndex < newMaxIndex)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [currentIndex, items.length])

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            disabled={!showLeftArrow}
            className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            disabled={!showRightArrow}
            className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => onItemClick(item)}
              className="flex-shrink-0 w-48 sm:w-56 lg:w-64 cursor-pointer group"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300 p-6 h-full">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                      {item.count} {itemType === "town" ? "events" : "events"}
                    </span>
                  </div>
                  {itemType === "category" && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(
                              (item.count /
                                Math.max(...items.map((i) => i.count))) *
                                100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
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
      if (!error) {
        // Filter out Library and Government events
        const filtered = data.filter(
          (e) => e.category !== "Library" && e.category !== "Government"
        )
        setEvents(filtered)
      }
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

  const handleTownClick = (town) => {
    // Convert town name to slug format
    const townSlug = town.toLowerCase().replace(/\s+/g, "-")
    navigate(`/towns/${townSlug}?page=1`)
  }

  if (loading) return <Loader />

  // Filter featured events (adjust category as needed)
  const featuredEvents = events.filter((e) => e.category === "Featured")

  // Filter today's events
  const todaysEvents = events.filter((e) => isEventToday(e.start_time))

  // Prepare town data for carousel
  const townData = HAMPTONS_TOWNS.slice(0, 15)
    .map((town) => ({
      name: town,
      count: events.filter((e) => e.town === town).length,
    }))
    .filter((town) => town.count > 0) // Only show towns with events

  // Prepare category data for carousel
  const categoryData = CATEGORIES.map((category) => ({
    name: category,
    count: groupedEvents[category]?.length || 0,
  })).filter((category) => category.count > 0) // Only show categories with events

  return (
    <>
      <SEO
        title="Things to Do in the Hamptons - Events, Activities & Attractions"
        description="Discover the best events, activities, and things to do in the Hamptons. From art galleries to beach activities, find your perfect Hamptons experience in East Hampton, Southampton, Montauk and more."
        keywords="things to do in the hamptons, hamptons events, hamptons activities, east hampton, southampton, montauk, hamptons nightlife, hamptons restaurants, hamptons art galleries, hamptons beaches, hamptons summer events, hamptons weekend activities"
      />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Hero Section with SEO Content */}
        <div className="text-center mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Your complete guide to events, activities, and attractions across
            the Hamptons. Explore East Hampton, Southampton, Sag Harbor,
            Montauk, and every unique village in between—find the best things to
            do today and this weekend.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/events/1")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Browse All Events
            </button>
            <button
              onClick={() => navigate("/featured")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Featured Activities
            </button>
          </div>
        </div>

        {/* Today's Events Section */}
        {todaysEvents.length > 0 && (
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                🔥 Events Happening Today
              </h2>
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium self-start sm:self-auto">
                {todaysEvents.length} events
              </span>
            </div>
            <EventSection
              title=""
              events={todaysEvents.slice(0, 3)}
              buttonLabel="View all today's events"
              onButtonClick={() => navigate("/events/1?today=true")}
            />
          </div>
        )}

        {/* Featured Events Section */}
        {featuredEvents.length > 0 && (
          <EventSection
            title="Featured Events"
            events={featuredEvents.slice(0, 3)}
            onButtonClick={() => navigate("/featured")}
          />
        )}

        {/* Browse by Town Section - Carousel */}
        {townData.length > 0 && (
          <Carousel
            title="Things to Do by Town"
            description="Explore events and activities in your favorite Hamptons town. From East Hampton's art scene to Montauk's beaches, each town offers unique experiences."
            items={townData}
            onItemClick={(town) => handleTownClick(town.name)}
            itemType="town"
          />
        )}

        {/* Browse by Category Section - Carousel */}
        {categoryData.length > 0 && (
          <Carousel
            title="Browse Events by Category"
            description="Find the perfect activity for your Hamptons visit. From outdoor adventures to cultural experiences, we've got you covered."
            items={categoryData}
            onItemClick={(category) => handleCategoryClick(category.name)}
            itemType="category"
          />
        )}

        {/* Date Filter Section */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            Find Events by Date
          </h3>
          <p className="text-gray-600 mb-4">
            Planning your Hamptons visit? Search for events on specific dates.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-700">Select Date:</label>
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
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              View Events
            </button>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="mb-12 bg-white rounded-xl p-8 shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Discover the Best Things to Do in the Hamptons
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                🏖️ Beach & Outdoor Activities
              </h3>
              <p className="text-gray-700 mb-4">
                From pristine beaches in Montauk to hiking trails in East
                Hampton, the Hamptons offer endless outdoor adventures. Enjoy
                surfing, paddleboarding, or simply relaxing on some of the most
                beautiful beaches in New York.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Beach activities and water sports</li>
                <li>• Hiking and nature trails</li>
                <li>• Golf courses and tennis</li>
                <li>• Fishing and boating</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                🎨 Arts & Culture
              </h3>
              <p className="text-gray-700 mb-4">
                The Hamptons are a cultural hub with world-class art galleries,
                museums, and performance venues. Explore the vibrant arts scene
                from Sag Harbor's historic theaters to East Hampton's
                contemporary galleries.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Art galleries and museums</li>
                <li>• Live music and performances</li>
                <li>• Film festivals and screenings</li>
                <li>• Cultural events and workshops</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Upcoming Events Section */}
        {/* <EventSection
          title="Upcoming Events"
          events={events.slice(0, 3)}
          buttonLabel="View all events"
          onButtonClick={handleAllEventsClick}
        /> */}

        {/* Sponsors Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Sponsors</h2>
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
    </>
  )
}
