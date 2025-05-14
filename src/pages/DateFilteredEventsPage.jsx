import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import EventSection from "../components/EventSection";
import Loader from "../components/Loader";

const EVENTS_PER_PAGE = 9;

export default function DateFilteredEventsPage() {
  const { date, page = 1 } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalEvents, setTotalEvents] = useState(0);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const start = (parseInt(page) - 1) * EVENTS_PER_PAGE;
      const end = start + EVENTS_PER_PAGE - 1;

      // Create date range for the selected date, accounting for timezone
      const selectedDate = new Date(date);
      const startDate = new Date(selectedDate);
      startDate.setUTCHours(0, 0, 0, 0);
      const endDate = new Date(selectedDate);
      endDate.setUTCHours(23, 59, 59, 999);

      // Fetch total count
      const { count } = await supabase
        .from("events")
        .select("*", { count: "exact", head: true })
        .gte("start_time", startDate.toISOString())
        .lte("start_time", endDate.toISOString());

      // Fetch paginated events
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("start_time", startDate.toISOString())
        .lte("start_time", endDate.toISOString())
        .order("start_time", { ascending: true })
        .range(start, end);

      if (!error) {
        setEvents(data);
        setTotalEvents(count);
      }
      setLoading(false);
    }
    fetchEvents();
  }, [date, page]);

  const totalPages = Math.ceil(totalEvents / EVENTS_PER_PAGE);

  const handlePageChange = (newPage) => {
    navigate(`/events/date/${date}/${newPage}`);
  };

  if (loading) return <Loader />;

  // Parse the date from URL (YYYY-MM-DD format)
  const [year, month, day] = date.split('-');
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dateObj = new Date(year, month - 1, day);
  const weekday = weekdayNames[dateObj.getDay()];
  const monthName = monthNames[month - 1];
  const formattedDate = `${weekday}, ${monthName} ${day}, ${year}`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* <h1 className="text-3xl font-bold mb-8">Events on {formattedDate}</h1> */}
      
      <EventSection
        title={`Events on ${formattedDate}`}
        events={events}
        showPagination={true}
        currentPage={parseInt(page)}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}