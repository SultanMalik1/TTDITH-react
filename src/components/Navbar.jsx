import React, { useState } from "react";
import { Link } from "react-router-dom";

const CATEGORIES = [
  "Nature", "Government", "Arts", "Music", "Restaurant",
  "Community", "Film", "Library", "Health", "Nightlife", "Spiritual"
];

export default function Navbar() {
  const [showCategories, setShowCategories] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <nav className="border-b border-gray-200 w-full bg-white">
      <div className="flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold mx-auto text-gray-900">Things to Do in the Hamptons</h1>
        <div className="flex gap-3 items-center absolute right-6 top-4">
          <Link 
            to="/list-event" 
            className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition text-gray-700"
          >
            List a Thing
          </Link>
          <Link 
            to="/sponsor" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
          >
            Become a Sponsor
          </Link>
        </div>
      </div>
      <div className="flex gap-6 justify-center items-center text-sm font-medium py-2 px-6 bg-white">
        <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
        <Link to="/featured" className="text-gray-700 hover:text-blue-600 transition">Featured Events</Link>
        <Link to="/events/1" className="text-gray-700 hover:text-blue-600 transition">All Events</Link>
        <Link to="/blog" className="text-gray-700 hover:text-blue-600 transition">Editorial Blog</Link>
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
        <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition">Contact Us</Link>
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
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 