import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventDetailPage from "./pages/EventDetailPage";
import CategoryPage from "./pages/CategoryPage";
import AllEventsPage from "./pages/AllEventsPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:slug" element={<EventDetailPage />} />
        <Route path="/categories/:category/:page" element={<CategoryPage />} />
        <Route path="/categories/:category" element={<CategoryPage />} />
        <Route path="/events/:page" element={<AllEventsPage />} />
        <Route path="/events" element={<AllEventsPage />} />
      </Routes>
    </Router>
  );
}

export default App;