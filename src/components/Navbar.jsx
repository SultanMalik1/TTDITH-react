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
    <nav className="border-b border-gray-200 w-full">
      <div className="flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold mx-auto">Things to Do in the Hamptons</h1>
        <div className="flex gap-3 items-center absolute right-6 top-4">
          <button className="border border-black px-4 py-2 rounded hover:bg-gray-100 transition">List a Thing</button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition font-semibold">Become a Sponsor</button>
        </div>
      </div>
      <div className="flex gap-6 justify-center items-center text-sm font-medium py-2 px-6">
        <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
        <Link to="/featured" className="hover:text-indigo-600 transition">Featured Events</Link>
        <Link to="/events/1" className="hover:text-indigo-600 transition">All Events</Link>
        <Link to="/blog" className="hover:text-indigo-600 transition">Editorial Blog</Link>
        <div className="relative">
          <button
            onClick={() => setShowCategories((v) => !v)}
            className="flex items-center gap-1 hover:text-indigo-600 transition"
          >
            Event Categories <span className="ml-1">▼</span>
          </button>
          {showCategories && (
            <div className="absolute left-0 mt-2 bg-white border rounded shadow z-10 min-w-[180px]">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  to={`/categories/${cat}/1`}
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700 transition"
                  onClick={() => setShowCategories(false)}
                >
                  {cat}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link to="/contact" className="hover:text-indigo-600 transition">Contact Us</Link>
        <div className="relative">
          <button
            onClick={() => setShowAbout((v) => !v)}
            className="flex items-center gap-1 hover:text-indigo-600 transition"
          >
            About <span className="ml-1">▼</span>
          </button>
          {showAbout && (
            <div className="absolute left-0 mt-2 bg-white border rounded shadow z-10 min-w-[140px]">
              <div className="py-2 px-4 text-gray-500">(About links go here)</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 