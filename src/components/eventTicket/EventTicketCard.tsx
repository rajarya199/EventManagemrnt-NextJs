"use client"
import { getUserBookings } from '@/app/actions/userBooking.action'
import React,{useState,useEffect} from 'react'
interface userProps{
    userId:string
}
import Link from 'next/link'
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { Calendar, Ticket,TicketIcon } from "lucide-react";
import { Badge } from "@/src/components/ui/badge"

import Image from "next/image";
import { format } from "date-fns"
const EventTicketCard = ({userId}:userProps) => {
      const [bookings,setBookings]=useState<any[]>([])
      const[loading,setLoading]=useState<boolean>(true)
    useEffect(() => {
                      const fetchData = async () => {
                        try {
                          const response = await getUserBookings(userId);
                          if (response.success && response.data) {
                            setBookings(response.data);
                          } else {
                            console.error("Failed to fetch booking data");
                          }
                        } catch (error) {
                          console.error("Failed to fetch booking datas");
                        }
                      };
                      fetchData();
                    }, [])
  return (
    <div>
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
  {bookings.map((booking) => (
    <Card key={booking.id} className="overflow-hidden shadow-lg rounded-xl">
      
      {/* Upper Section: Image Background with Event Title & Date */}
      <div 
        className="relative h-60 bg-cover bg-center rounded-t-xl"
        style={{ backgroundImage: `url(${booking.Event.imageUrl[0]})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-lg font-semibold">{booking.Event.title}</h3>
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{format(new Date(booking.Event.startTime), "MMM d, yyyy")}</span>
          </div>
        </div>

        {/* Booking Status Badge */}
        <div 
          className={`absolute top-2 right-2 text-xs px-3 py-1 rounded-full shadow-md font-medium ${
            booking.status === "Confirmed" ? "bg-green-500 text-white" 
            : "bg-yellow-500 text-white"
          }`}
        >
          {booking.status}
        </div>
      </div>

      {/* Lower Section: Ticket Info */}
      <CardContent className="p-5 space-y-3">
        <h4 className="text-md font-semibold text-slate-700">Tickets</h4>
        <div className="space-y-2 bg-gray-100 rounded-lg">
          {booking.TicketOnBooking.map((ticket: any) => (
            <div key={ticket.id} className="flex justify-between items-center p-2 rounded-lg">
              <div className="flex items-center gap-2">
                <Ticket className="h-6 w-6 text-blue-600" />
                <span className="font-medium">{ticket.TicketCategory.name}</span>
              </div>
              <span className="font-semibold text-lg text-blue-700">× {ticket.quantity}</span>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Footer Section: View Tickets Button */}
      <CardFooter className=" p-2 flex justify-center items-center border-t bg-gray-50">
        <Link href={`/profile/my-tickets/${booking.id}`}>
        <button 
          className=" w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition"
        
        >
          View Tickets
        </button>
        </Link>

      </CardFooter>

    </Card>
  ))}
</div>





      
    </div>
  )
}

export default EventTicketCard