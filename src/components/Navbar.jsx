import React, { useState } from "react"
import { Link } from "react-router-dom"

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

export default function Navbar() {
  const [showCategories, setShowCategories] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="border-b border-gray-200 w-full bg-gradient-to-b from-sky-100/80 via-blue-50/70 via-blue-50/40 to-white">
      <div className="flex justify-between items-center py-4 px-6 relative">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 z-10"
        >
          <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Logo/Title - absolutely centered */}
        <Link
          className="absolute left-1/2 transform -translate-x-1/2 text-2xl lg:text-3xl font-bold text-center font-sans hover:scale-[1.02] transition-transform"
          to="/"
        >
          <h1 className="text-center">
            <span className="font-light tracking-tight text-black">
              Things to Do
            </span>
            <span className="block font-extrabold tracking-wide bg-gradient-to-r from-blue-500 via-sky-400 via-cyan-400 to-indigo-400 animate-gradient bg-[length:200%_auto] bg-clip-text text-transparent">
              in the Hamptons
            </span>
          </h1>
        </Link>

        {/* Desktop navigation buttons - positioned on the right */}
        <div className="hidden lg:flex gap-3 items-center ml-auto">
          <Link
            to="/list-event"
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            List an Event
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } bg-white border-t border-gray-200`}
      >
        <div className="px-4 py-2 space-y-2">
          <Link
            to="/list-event"
            className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 text-center font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            List an Event
          </Link>
        </div>
        <div className="px-4 py-2 space-y-2">
          <Link
            to="/"
            className="block text-gray-700 hover:text-blue-600 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/featured"
            className="block text-gray-700 hover:text-blue-600 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Featured Events
          </Link>
          <Link
            to="/events/1"
            className="block text-gray-700 hover:text-blue-600 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            All Events
          </Link>
          <Link
            to="/blog"
            className="block text-gray-700 hover:text-blue-600 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Editorial Blog
          </Link>
          <Link
            to="/contact"
            className="block text-gray-700 hover:text-blue-600 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact Us
          </Link>

          {/* Mobile Categories Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowCategories((v) => !v)}
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition w-full"
            >
              Event Categories <span className="ml-1">▼</span>
            </button>
            {showCategories && (
              <div className="mt-2 bg-white border border-gray-200 rounded shadow-lg">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    to={`/categories/${cat}/1`}
                    className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-700 transition text-gray-700"
                    onClick={() => {
                      setShowCategories(false)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile About Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowAbout((v) => !v)}
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition w-full"
            >
              About <span className="ml-1">▼</span>
            </button>
            {showAbout && (
              <div className="mt-2 bg-white border border-gray-200 rounded shadow-lg">
                <Link
                  to="/about"
                  className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-700 transition text-gray-700"
                  onClick={() => {
                    setShowAbout(false)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  About Us
                </Link>
                <Link
                  to="/sponsors"
                  className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-700 transition text-gray-700"
                  onClick={() => {
                    setShowAbout(false)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Sponsors
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop navigation menu */}
      <div className="hidden lg:flex gap-6 justify-center items-center text-sm font-medium py-2 px-6 bg-white">
        <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
          Home
        </Link>
        <Link
          to="/featured"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Featured Events
        </Link>
        <Link
          to="/events/1"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          All Events
        </Link>
        <Link
          to="/blog"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Editorial Blog
        </Link>
        <div className="relative">
          <button
            onClick={() => setShowCategories((v) => !v)}
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition"
          >
            Event Categories <span className="ml-1">▼</span>
          </button>
          {showCategories && (
            <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-10 min-w-[180px]">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  to={`/categories/${cat}/1`}
                  className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-700 transition text-gray-700"
                  onClick={() => setShowCategories(false)}
                >
                  {cat}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link
          to="/contact"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Contact Us
        </Link>
        <div className="relative">
          <button
            onClick={() => setShowAbout((v) => !v)}
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition"
          >
            About <span className="ml-1">▼</span>
          </button>
          {showAbout && (
            <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-10 min-w-[140px]">
              <Link
                to="/about"
                className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-700 transition text-gray-700"
                onClick={() => setShowAbout(false)}
              >
                About Us
              </Link>
              <Link
                to="/sponsors"
                className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-700 transition text-gray-700"
                onClick={() => setShowAbout(false)}
              >
                Sponsors
              </Link>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </nav>
  )
}
