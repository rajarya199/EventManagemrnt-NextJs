"use client"
import React,{useState,useEffect} from 'react'
import { MoreHorizontal, Search, Filter } from "lucide-react";
import { getAllBookings } from '@/app/actions/eventBooking.action';
import BookingTable from './BookingTable';

const BookingSection = () => {
    const[bookings,setBookings]=useState<any[]>([])
            const [loading, setLoading] = useState<boolean>(true);
        
            const [searchQuery, setSearchQuery] = useState("");
            useEffect(()=>{
                const fetchData=async()=>{
                    try{
                        const response=await getAllBookings();
                        if(response.success && response.data){
                            setBookings(response.data)
                        }
                        else{
                            console.error("failed to fetch bookings")
                        }
                    }
                    catch(error){
                        console.error("failed to fetch bookings")
                    }
                    finally{
                        setLoading(false)
                    }
                };
                fetchData()
            },[])
            if (loading) {
                return (
                    <div className="flex justify-center items-center my-20 h-full">
                        loading...
                    </div>
                );
            }
  return (
    <div className='wrapper'>

          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="text"
                              placeholder="Search bookings..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <button className="flex items-center px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <Filter className="w-4 h-4 mr-2" />
                            Filter
                          </button>
                        </div>
                       
                     
                      </div>
                      <BookingTable bookings={bookings}/>
    </div>
  )
}

export default BookingSection