"use client"
import React,{useState,useEffect} from 'react'
import { Search, Plus, Filter } from "lucide-react";
import { getUserEvents } from '@/app/actions/event.action';
import { EventGrid } from './EventGrid';
import { UserEventGrid } from './UserEventGrid';
const categories = ["All", "Technology", "Business", "Arts", "Sports", "Music"];
interface EventProps{
    userId:string
}
const ProfileEventPage = ({userId}:EventProps) => {
        const [events,setEvents]=useState<any[]>([])
    
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
            const fetchEvents = async () => {
              try {
                const response = await getUserEvents(userId);
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
          }, [userId]);
  return (
    <div>
         <div className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl font-poppins font-semibold text-gray-900">Events</h1>
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm">
                    <Plus size={20} />
                    Add Event
                  </button>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

         
          <div className="flex items-center space-x-4 gap-3">
          <Filter className="text-gray-400 w-5 h-5" />

            <select
              className="border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
           
          
          </div>
        </div>
        <UserEventGrid events={events}/>
    </div>
  )
}

export default ProfileEventPage