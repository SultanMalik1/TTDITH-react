import React, { useEffect } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import ReactGA from "react-ga4"
import HomePage from "./pages/HomePage"
import ContactPage from "./pages/ContactPage"
import EventDetailPage from "./pages/EventDetailPage"
import CategoryPage from "./pages/CategoryPage"
import AllEventsPage from "./pages/AllEventsPage"
import DateFilteredEventsPage from "./pages/DateFilteredEventsPage"
import AboutPage from "./pages/AboutPage"
import ListEventPage from "./pages/ListEventPage"
import SponserUsPage from "./pages/SponserUsPage"
import SponsorsPage from "./sponsors/pages/SponsorsPage"
import SponsorDetailPage from "./sponsors/pages/SponsorDetailPage"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import FeaturedEventsPage from "./pages/FeaturedEventsPage"
import SEO from "./components/SEO"

// Initialize GA4
ReactGA.initialize("G-6WEJG5ERYL")

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
          <Route
            path="/categories/:category/:page"
            element={<CategoryPage />}
          />
          <Route path="/categories/:category" element={<CategoryPage />} />
          <Route path="/events/:page" element={<AllEventsPage />} />
          <Route path="/events" element={<AllEventsPage />} />
          <Route
            path="/events/date/:date/:page"
            element={<DateFilteredEventsPage />}
          />
          <Route
            path="/events/date/:date"
            element={<DateFilteredEventsPage />}
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/list-event" element={<ListEventPage />} />
          <Route path="/sponsor" element={<SponserUsPage />} />
          <Route path="/sponsors" element={<SponsorsPage />} />
          <Route path="/sponsors/:sponsorId" element={<SponsorDetailPage />} />
          <Route path="/featured" element={<FeaturedEventsPage />} />
        </Routes>
        <Footer />
      </Router>
    </HelmetProvider>
  )
}

// Route tracking component
function RouteTracker() {
  const location = useLocation()

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname })
  }, [location])

  return null
}

export default App
