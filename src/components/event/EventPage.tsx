"use client";
import React, { useState, useEffect } from "react";
import { EventGrid } from "./EventGrid";
import { EventList } from "./EventList";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";

import { Search, Grid, List, Plus } from "lucide-react";
import { getAllEvents } from "@/app/actions/event.action";
import { format } from "date-fns";
import PastEventCard from "./PastEventCard";

const categories = ["All", "Technology", "Business", "Arts", "Sports", "Music"];

const EventPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [isGridView, setIsGridView] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        if (response.success && response.data) {
          setEvents(response.data);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Failed to fetch events");
      }
    };
    fetchEvents();
  }, []);

  const currentTime = new Date();

  // Categorize events
  const upcomingEvents = events.filter(
    (event) =>
      new Date(event.startTime) >= currentTime || // Upcoming
      (new Date(event.startTime) <= currentTime && new Date(event.endTime) >= currentTime) // Ongoing
  );

  const pastEvents = events
    .filter((event) => new Date(event.endTime) < currentTime)
    .slice(0, 3); // Show only 3 past events initially

  // Filter only upcoming/active events based on search query
  const filteredEvents = upcomingEvents.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-poppins font-semibold text-gray-900">
            Events
          </h1>
          <Link
            href="/events/add"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
          >
            <Plus size={20} />
            Add Event
          </Link>
        </div>

        {/* Search & Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button
              className={`p-3 rounded-lg transition-all duration-200 ${
                isGridView
                  ? "bg-gray-200 text-gray-800"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setIsGridView(true)}
            >
              <Grid size={20} />
            </button>
            <button
              className={`p-3 rounded-lg transition-all duration-200 ${
                !isGridView
                  ? "bg-gray-200 text-gray-800"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setIsGridView(false)}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* If there's a search query, show filtered results */}
        {searchQuery ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Search Results</h2>
            {isGridView ? <EventGrid events={filteredEvents} /> : <EventList events={filteredEvents} />}
          </>
        ) : (
          <>
            {upcomingEvents.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Live & Upcoming Events</h2>
                {isGridView ? <EventGrid events={upcomingEvents} /> : <EventList events={upcomingEvents} />}
              </div>
            )}

            {/* Past Events (Show only 3) */}
            {pastEvents.length > 0 && (
  <div className="mt-12">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-gray-900">Past Events</h2>
      <Link
        href="/past-event"
        className="text-blue-600  items-baseline font-medium flex gap-1"
      >
        <span className="px-4">Show More</span>
         
      </Link>
    </div>

    {isGridView ? <PastEventCard events={pastEvents} /> : <PastEventCard events={pastEvents} />}
  </div>
)}

          </>
        )}
      </div>
    </div>
  );
};

export default EventPage;
