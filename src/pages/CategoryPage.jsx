import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import EventSection from "../components/EventSection"
import Loader from "../components/Loader"
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

  if (loading) return <Loader />

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">{category} Events</h1>

      <EventSection
        title={`${category} Events`}
        events={events}
        showPagination={true}
        currentPage={parseInt(page)}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
