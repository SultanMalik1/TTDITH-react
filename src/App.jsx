import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import EventDetailPage from "./pages/EventDetailPage"
import AllEventsPage from "./pages/AllEventsPage"
import CategoryPage from "./pages/CategoryPage"
import DateFilteredEventsPage from "./pages/DateFilteredEventsPage"
import ContactPage from "./pages/ContactPage"
import AboutPage from "./pages/AboutPage"
import FAQPage from "./pages/FAQPage"
import ListEventPage from "./pages/ListEventPage"
import SponserUsPage from "./pages/SponserUsPage"
import FeaturedEventsPage from "./pages/FeaturedEventsPage"
import SponsorsPage from "./sponsors/pages/SponsorsPage"
import SponsorDetailPage from "./sponsors/pages/SponsorDetailPage"
import TownPage from "./pages/TownPage"
import SEO from "./components/SEO"

// Route tracking component
const RouteTracker = () => {
  const location = window.location
  React.useEffect(() => {
    // Track page views
    if (window.gtag) {
      window.gtag("config", "G-XXXXXXXXXX", {
        page_path: location.pathname + location.search,
      })
    }
  }, [location])

  return null
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <RouteTracker />
        <SEO
          title="Things to Do in the Hamptons"
          description="Discover the best events, activities, and things to do in the Hamptons. From art galleries to beach activities, find your perfect Hamptons experience."
          keywords="things to do in the hamptons, hamptons events, hamptons activities, east hampton, southampton, montauk, hamptons nightlife, hamptons restaurants, hamptons art galleries, hamptons beaches"
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event/:slug" element={<EventDetailPage />} />

          {/* Category routes - original structure */}
          <Route
            path="/categories/:category/:page"
            element={<CategoryPage />}
          />
          <Route path="/categories/:category" element={<CategoryPage />} />

          {/* Events routes - original structure */}
          <Route path="/events/:page" element={<AllEventsPage />} />
          <Route path="/events" element={<AllEventsPage />} />

          {/* Date filtered events - original structure */}
          <Route
            path="/events/date/:date/:page"
            element={<DateFilteredEventsPage />}
          />
          <Route
            path="/events/date/:date"
            element={<DateFilteredEventsPage />}
          />

          {/* Town routes - new dedicated town pages */}
          <Route path="/towns/:townSlug" element={<TownPage />} />

          {/* Other pages */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/list-event" element={<ListEventPage />} />
          <Route path="/sponsor" element={<SponserUsPage />} />
          <Route path="/sponsors" element={<SponsorsPage />} />
          <Route path="/sponsors/:sponsorId" element={<SponsorDetailPage />} />
          <Route path="/featured/:page" element={<FeaturedEventsPage />} />
          <Route path="/featured" element={<FeaturedEventsPage />} />
        </Routes>
        <Footer />
      </Router>
    </HelmetProvider>
  )
}

export default App
