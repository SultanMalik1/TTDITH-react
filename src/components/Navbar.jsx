import React, { useState, useEffect } from "react"
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
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest("nav")) {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isMobileMenuOpen])

  // Close dropdowns when mobile menu closes
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setShowCategories(false)
      setShowAbout(false)
    }
  }, [isMobileMenuOpen])

  return (
    <nav
      className={`border-b border-gray-200 w-full bg-gradient-to-b from-sky-100/80 via-blue-50/70 via-blue-50/40 to-white transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main navbar container - compact like before */}
        <div className="flex justify-between items-center py-3 px-4 sm:px-6 lg:px-8 relative">
          {/* Mobile menu button - compact size */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 touch-manipulation"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="h-5 w-5 text-gray-600"
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

          {/* Logo/Title - compact sizing */}
          <Link
            className="absolute left-1/2 transform -translate-x-1/2 text-center font-sans hover:scale-[1.02] transition-transform duration-200 touch-manipulation"
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <h1 className="text-center">
              <span className="font-light tracking-tight text-black text-lg sm:text-xl md:text-2xl lg:text-3xl">
                Things to Do
              </span>
              <span className="block font-extrabold tracking-wide bg-gradient-to-r from-blue-500 via-sky-400 via-cyan-400 to-indigo-400 animate-gradient bg-[length:200%_auto] bg-clip-text text-transparent text-lg sm:text-xl md:text-2xl lg:text-3xl">
                in the Hamptons
              </span>
            </h1>
          </Link>

          {/* Desktop navigation buttons */}
          <div className="hidden lg:flex gap-3 items-center ml-auto">
            <Link
              to="/list-event"
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              List an Event
            </Link>
          </div>
        </div>

        {/* Mobile menu overlay */}
        <div
          className={`lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 z-40 ${
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile menu content - compact and responsive */}
        <div
          className={`lg:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Mobile menu header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-sky-50">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
              aria-label="Close mobile menu"
            >
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile menu items */}
          <div className="overflow-y-auto h-full pb-20 custom-scrollbar">
            <div className="p-4 space-y-1">
              {/* Primary actions */}
              <Link
                to="/list-event"
                className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 text-center font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 mb-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                List an Event
              </Link>

              {/* Main navigation links */}
              <Link
                to="/"
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/featured"
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Featured Events
              </Link>
              <Link
                to="/events/1"
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Events
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>

              {/* Mobile Categories Dropdown */}
              <div className="border-t border-gray-100 pt-4 mt-4">
                <button
                  onClick={() => setShowCategories((v) => !v)}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                >
                  <span>Event Categories</span>
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${showCategories ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {showCategories && (
                  <div className="mt-2 ml-4 space-y-1">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat}
                        to={`/categories/${cat}/1`}
                        className="block px-4 py-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 text-sm"
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
              <div className="border-t border-gray-100 pt-4 mt-4">
                <button
                  onClick={() => setShowAbout((v) => !v)}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                >
                  <span>About</span>
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${showAbout ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {showAbout && (
                  <div className="mt-2 ml-4 space-y-1">
                    <Link
                      to="/about"
                      className="block px-4 py-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 text-sm"
                      onClick={() => {
                        setShowAbout(false)
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      About Us
                    </Link>
                    <Link
                      to="/sponsors"
                      className="block px-4 py-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 text-sm"
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
        </div>

        {/* Desktop navigation menu - compact like before */}
        <div className="hidden lg:flex gap-6 justify-center items-center text-sm font-medium py-2 px-6 bg-white">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-blue-50"
          >
            Home
          </Link>
          <Link
            to="/featured"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-blue-50"
          >
            Featured Events
          </Link>
          <Link
            to="/events/1"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-blue-50"
          >
            All Events
          </Link>
          <div className="relative group">
            <button
              onClick={() => setShowCategories((v) => !v)}
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              Event Categories
              <svg
                className="h-4 w-4 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {showCategories && (
              <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-10 min-w-[200px] py-2">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    to={`/categories/${cat}/1`}
                    className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 text-gray-700"
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
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-blue-50"
          >
            Contact Us
          </Link>
          <div className="relative group">
            <button
              onClick={() => setShowAbout((v) => !v)}
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              About
              <svg
                className="h-4 w-4 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {showAbout && (
              <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-10 min-w-[160px] py-2">
                <Link
                  to="/about"
                  className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 text-gray-700"
                  onClick={() => setShowAbout(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/sponsors"
                  className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 text-gray-700"
                  onClick={() => setShowAbout(false)}
                >
                  Sponsors
                </Link>
              </div>
            )}
          </div>
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
