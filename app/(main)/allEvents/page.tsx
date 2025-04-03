"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { getUpcomingAndActiveEvents } from "@/app/actions/event.action";
import { EventGrid } from "@/src/components/event/EventGrid";

const EventsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get the initial search query from the URL
  const searchQueryFromURL = searchParams.get("search") || "";

  const [allEvents, setAllEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchQueryFromURL);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getUpcomingAndActiveEvents();
        if (response.success && response.data) {
          setAllEvents(response.data);
          setFilteredEvents(filterEvents(response.data, searchQueryFromURL));
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filterEvents = (events: any[], query: string) => {
    if (!query) return events; // Show all if no query
    return events.filter((event) =>
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.address.toLowerCase().includes(query.toLowerCase()) ||
      event.Category?.name?.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    router.push(`/allEvents?search=${encodeURIComponent(query)}`, { scroll: false }); // Update URL

    setFilteredEvents(filterEvents(allEvents, query));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="wrapper bg-primary-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-poppins font-semibold text-gray-900">
          Events
        </h1>
      </div>

      {/* Search Box */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search events by name, location, category..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div>
        <EventGrid events={filteredEvents} />
      </div>
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
    <EventsPage />
  </Suspense>
);

export default Page;
