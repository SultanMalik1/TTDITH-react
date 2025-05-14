import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import EventDetailPage from "./pages/EventDetailPage";
import CategoryPage from "./pages/CategoryPage";
import AllEventsPage from "./pages/AllEventsPage";
import DateFilteredEventsPage from "./pages/DateFilteredEventsPage";
import AboutPage from "./pages/AboutPage";
import ListEventPage from "./pages/ListEventPage";
import SponserUsPage from "./pages/SponserUsPage";
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
        <Route path="/events/date/:date/:page" element={<DateFilteredEventsPage />} />
        <Route path="/events/date/:date" element={<DateFilteredEventsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/list-event" element={<ListEventPage />} />
        <Route path="/sponsor" element={<SponserUsPage />} />
      </Routes>
    </Router>
  );
}

export default App;