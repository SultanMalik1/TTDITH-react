import React, { useState } from "react"

const ListEventPage = () => {
  const [showThankYou, setShowThankYou] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    form.reset()
    setShowThankYou(true)
    // Scroll to thank you message
    setTimeout(() => {
      const thankYouElement = document.getElementById("thank-you-message")
      if (thankYouElement) {
        thankYouElement.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
    // Hide thank you message after 5 seconds
    setTimeout(() => {
      setShowThankYou(false)
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Promote Your Thing
          </h1>
          <p className="text-xl text-gray-600">
            Get your event noticed by the Hamptons community! Choose from our
            premium promotion options or list your event for free.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Premium Promotion Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Premium Promotion
            </h3>
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-4">
                <h4 className="text-xl font-semibold text-gray-900">
                  Main Featured Tab
                </h4>
                <p className="text-3xl font-bold text-blue-600">
                  $75<span className="text-lg">/day</span>
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Top placement on our homepage
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Larger image display
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Priority listing in event categories
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Social media promotion included
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900">
                  Sub Featured Tab
                </h4>
                <p className="text-3xl font-bold text-blue-600">
                  $40<span className="text-lg">/day</span>
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Secondary placement on our homepage
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Standard image display
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Regular listing in event categories
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Free Listing Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Free Event Listing
            </h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Basic listing in our event directory
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Standard image display
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Regular listing in event categories
              </li>
            </ul>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <form
            name="promote-event"
            netlify
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Netlify form hidden input */}
            <input type="hidden" name="form-name" value="promote-event" />
            <input
              type="hidden"
              name="recipient"
              value="santiagosaldivar19@gmail.com"
            />
            <input
              type="hidden"
              name="subject"
              value="New Event Listing Request"
            />

            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label className="font-medium text-gray-700">
                  Promotion Type
                </label>
                <select
                  name="promotion-type"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Promotion Type</option>
                  <option value="main-featured">
                    Main Featured Tab ($75/day)
                  </option>
                  <option value="sub-featured">
                    Sub Featured Tab ($40/day)
                  </option>
                  <option value="free-listing">Free Event Listing</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label className="font-medium text-gray-700">Event Title</label>
                <input
                  type="text"
                  name="event-title"
                  required
                  minLength="2"
                  maxLength="100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label className="font-medium text-gray-700">Event URL</label>
                <input
                  type="url"
                  name="event-url"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label className="font-medium text-gray-700">
                  Event Image URL
                </label>
                <input
                  type="url"
                  name="image-url"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label className="font-medium text-gray-700">Start Time</label>
                <input
                  type="datetime-local"
                  name="start-time"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label className="font-medium text-gray-700">End Time</label>
                <input
                  type="datetime-local"
                  name="end-time"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label className="font-medium text-gray-700">Town</label>
                <input
                  type="text"
                  name="town"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label className="font-medium text-gray-700">Cost</label>
                <input
                  type="text"
                  name="cost"
                  required
                  placeholder="e.g., Free, $20, $50-100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label className="font-medium text-gray-700">
                  Business/Venue Name
                </label>
                <input
                  type="text"
                  name="venue-name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label className="font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label className="font-medium text-gray-700">
                  Registration URL
                </label>
                <input
                  type="url"
                  name="registration-url"
                  placeholder="e.g., Eventbrite link"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label className="font-medium text-gray-700">
                  Contact Name
                </label>
                <input
                  type="text"
                  name="contact-name"
                  required
                  minLength="2"
                  maxLength="100"
                  pattern="[A-Za-z\s\-']+"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label className="font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                <label className="font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  pattern="[0-9+\-()\s]{10,20}"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-start">
              <label className="font-medium text-gray-700">
                Event Description
              </label>
              <textarea
                name="event-description"
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
              >
                Submit Event
              </button>
            </div>
          </form>

          {showThankYou && (
            <div
              id="thank-you-message"
              className="mt-8 p-6 bg-green-50 text-green-800 rounded-lg text-center border border-green-200 transform transition-all duration-500 ease-in-out animate-fade-in"
              style={{
                animation: "fadeIn 0.5s ease-in-out",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div className="flex items-center justify-center mb-3">
                <svg
                  className="w-8 h-8 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <h3 className="text-xl font-bold">Thank You!</h3>
              </div>
              <p className="text-green-700">
                We've received your event listing request and will get back to
                you shortly.
              </p>
            </div>
          )}

          <style jsx>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fade-in {
              animation: fadeIn 0.5s ease-in-out;
            }
          `}</style>
        </div>
      </div>
    </div>
  )
}

export default ListEventPage
