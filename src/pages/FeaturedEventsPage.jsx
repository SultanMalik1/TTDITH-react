import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import EventSection from "../components/EventSection";
import Loader from "../components/Loader";

export default function FeaturedEventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("category", "Featured")
        .gt("start_time", now)
        .order("start_time", { ascending: true });
      if (!error) setEvents(data);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <EventSection
        title="All Featured Events"
        events={events}
        buttonLabel={null}
      />
      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
      >
        ← Back
      </button>
    </div>
  );
} 