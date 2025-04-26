"use client"
import React,{useState} from 'react'
import Link from 'next/link';
import { MoreHorizontal, Search, Filter } from "lucide-react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import EventTable from './EventTable';
const EventSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
         <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 w-4 h-4" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center px-4 py-2 text-gray-600dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
        <Link href='/dashboard/events/add'>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Event
        </button>
        </Link>
     
      </div>
      <EventTable  searchQuery={searchQuery}/>

    </div>
  )
}

export default EventSection