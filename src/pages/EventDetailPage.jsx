import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import Loader from "../components/Loader";

export default function EventDetailPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("slug", slug)
        .single();
      if (!error) setEvent(data);
      setLoading(false);
    }
    fetchEvent();
  }, [slug]);

  if (loading) return <Loader />;
  if (!event) return <div className="text-center py-20">Event not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
      <div className="flex items-center text-gray-600 mb-4">
        <span className="mr-2">📅</span>
        {new Date(event.start_time).toLocaleString("en-US", { timeZone: "America/New_York" })}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {event.town && <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs">{event.town}</span>}
        {event.category && <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs">{event.category}</span>}
        {event.url && (
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
          >
            Go To Event →
          </a>
        )}
      </div>
      {event.image_url && (
        <img src={event.image_url} alt={event.title} className="rounded-xl mb-6 w-full object-cover" />
      )}
      <h2 className="text-2xl font-semibold mb-2">Event Description</h2>
      <p className="text-gray-800 mb-6">{event.description}</p>
     
    </div>
  );
}