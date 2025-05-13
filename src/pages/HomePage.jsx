// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import EventSection from "../components/EventSection";
import Loader from "../components/Loader";

const CATEGORIES = [
  "Nature", "Government", "Arts", "Music", "Restaurant",
  "Community", "Film", "Library", "Health", "Nightlife", "Spiritual"
];

function groupEventsByCategory(events) {
  const grouped = {};
  CATEGORIES.forEach((cat) => { grouped[cat] = []; });
  events.forEach((event) => {
    if (grouped[event.category]) {
      grouped[event.category].push(event);
    }
  });
  return grouped;
}

export default function HomePage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("start_time", { ascending: true });
      if (!error) setEvents(data);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  const groupedEvents = groupEventsByCategory(events);

  const handleCategoryClick = (category) => {
    navigate(`/categories/${category}/1`);
  };

  const handleAllEventsClick = () => {
    navigate('/events/1');
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
      <EventSection
        title="Upcoming Events"
        events={events.slice(0, 3)}
        buttonLabel="All events →"
        onButtonClick={handleAllEventsClick}
      />
      {CATEGORIES.map((category) =>
        groupedEvents[category]?.length ? (
          <EventSection
            key={category}
            title={`${category} Events`}
            events={groupedEvents[category]}
            buttonLabel={`All ${category.toLowerCase()} events →`}
            onButtonClick={() => handleCategoryClick(category)}
          />
        ) : null
      )}
    </div>
  );
}