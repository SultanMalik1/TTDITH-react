import React, { useState, useEffect } from "react"
import { supabase } from "../lib/supabaseClient"
import Loader from "../components/Loader"
import SEO from "../components/SEO"

const ADMIN_PASSWORD = "@checkevent123"

const CheckEventsPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (isAuthenticated) {
      fetchActiveEvents()
    }
  }, [isAuthenticated])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Incorrect password")
    }
  }

  const fetchActiveEvents = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("user_submitted_events")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      setEvents(data || [])
    } catch (err) {
      setError("Failed to fetch events: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateEventStatus = async (eventId, newStatus) => {
    setUpdating(true)
    setError("")
    setSuccess("")

    try {
      if (newStatus === "completed") {
        // Move event to events table
        const eventToMove = events.find((e) => e.id === eventId)
        if (!eventToMove) {
          throw new Error("Event not found")
        }

        // Insert into events table
        const { error: insertError } = await supabase.from("events").insert([
          {
            created_at: eventToMove.created_at,
            title: eventToMove.title,
            url: eventToMove.registration_url || eventToMove.url,
            description: eventToMove.description,
            start_time: eventToMove.start_time,
            end_time: eventToMove.end_time,
            image_url: eventToMove.image_url,
            town: eventToMove.town || "Hamptons",
            tags: eventToMove.tags,
            cost: eventToMove.cost,
            location: eventToMove.location,
            address: eventToMove.address,
            cancelled: false,
            status: "active",
            last_updated: new Date().toISOString(),
            recurring: false,
            category: eventToMove.category,
            headline_type: eventToMove.headline_type || "normal",
            registration_url: eventToMove.registration_url,
          },
        ])

        if (insertError) {
          throw insertError
        }

        // Update status in user_submitted_events table
        const { error: updateError } = await supabase
          .from("user_submitted_events")
          .update({ status: newStatus })
          .eq("id", eventId)

        if (updateError) {
          throw updateError
        }

        setSuccess("Event approved and moved to events table!")
      } else {
        // Just update status to rejected
        const { error: updateError } = await supabase
          .from("user_submitted_events")
          .update({ status: newStatus })
          .eq("id", eventId)

        if (updateError) {
          throw updateError
        }

        setSuccess(`Event ${newStatus}!`)
      }

      // Refresh the events list
      await fetchActiveEvents()
    } catch (err) {
      setError("Failed to update event: " + err.message)
    } finally {
      setUpdating(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  const formatCost = (cost) => {
    if (!cost) return "Free"
    return `$${parseFloat(cost).toFixed(2)}`
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <SEO
          title="Admin Login - Things to Do in the Hamptons"
          description="Admin login for event verification"
          keywords="admin, events, verification"
        />
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Admin Login
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <SEO
        title="Check Events - Admin - Things to Do in the Hamptons"
        description="Admin panel for verifying user-submitted events"
        keywords="admin, events, verification"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Check User-Submitted Events
          </h1>
          <p className="text-gray-600">
            Review and approve/reject events submitted by users
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm">{success}</p>
          </div>
        )}

        {loading ? (
          <Loader />
        ) : events.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 text-lg">No active events to review</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Event Image */}
                  <div className="lg:col-span-1">
                    {event.image_url && (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.style.display = "none"
                        }}
                      />
                    )}
                  </div>

                  {/* Event Details */}
                  <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {event.title}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Start Time</p>
                        <p className="font-medium">
                          {formatDate(event.start_time)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">End Time</p>
                        <p className="font-medium">
                          {formatDate(event.end_time)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">
                          {event.location || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Cost</p>
                        <p className="font-medium">{formatCost(event.cost)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <p className="font-medium">
                          {event.category || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">
                          {event.address || "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Description</p>
                      <p className="text-gray-700 mt-1 line-clamp-3">
                        {event.description}
                      </p>
                    </div>

                    {event.registration_url && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">
                          Registration URL
                        </p>
                        <a
                          href={event.registration_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm break-all"
                        >
                          {event.registration_url}
                        </a>
                      </div>
                    )}

                    <div className="mb-4">
                      <p className="text-sm text-gray-500">
                        Contact Information
                      </p>
                      <p className="text-sm text-gray-700">
                        {event.contact_name && `Name: ${event.contact_name}`}
                        {event.email && ` | Email: ${event.email}`}
                        {event.phone && ` | Phone: ${event.phone}`}
                      </p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Submitted</p>
                      <p className="text-sm text-gray-700">
                        {formatDate(event.created_at)}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => updateEventStatus(event.id, "completed")}
                        disabled={updating}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                      >
                        {updating ? "Processing..." : "Approve"}
                      </button>
                      <button
                        onClick={() => updateEventStatus(event.id, "rejected")}
                        disabled={updating}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                      >
                        {updating ? "Processing..." : "Reject"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckEventsPage
