"use client"
import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from "date-fns";

import { Calendar, MapPin, Search } from "lucide-react"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { getAllEvents ,getUpcomingAndActiveEvents} from "@/app/actions/event.action";

import { Card, CardContent, CardFooter } from "@/src/components/ui/card"

const formatAddress = (address: string) => {
  // split address by comma and join ist 2 with " , space"
  return address.split(",").slice(0, 2).map(part => part.trim()).join(", ");
};

const defaultImg="/assets/images/no-event.png"
const EventsCard = () => {
        const [events,setEvents]=useState<any[]>([])
    useEffect(() => {
            const fetchEvents = async () => {
              try {
                const response = await getUpcomingAndActiveEvents();
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
  return (
    
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event)=>(
                       <Card key={event.id} className="overflow-hidden transition-all hover:shadow-md">
                       <Link href={`/events/${event.id}`} className="block">
                         <div className="relative aspect-[16/9]">
                         {event.imageUrl && event.imageUrl.length > 0 ? (
                <Image src={event.imageUrl[0]} alt={event.title} fill className="object-cover" />
              ) : (
                <Image src={defaultImg} alt={event.title} fill className="object-cover" />
              )}
                         </div>
                         <CardContent className="p-4">
                           <div className="flex flex-wrap gap-2 mb-2">
                             
                               <Badge variant="success" className="font-normal">
                                 {event.Category.name}
                               </Badge>
                               <Badge variant="secondary" className="font-normal">
                                 {event.type}
                               </Badge>
                            
                           </div>
                           <h3 className="font-semibold text-lg mb-2 line-clamp-2">{event.title}</h3>
                           <div className="flex items-center text-sm text-slate-800 dark:text-slate-400 mb-2">
                             <Calendar className="h-4 w-4 mr-1" />
                             <span>
                                                
                                                   {format(event.startTime, "MMM d, yyyy")} -{" "}
                                                                    {format(event.endTime, "MMM d, yyyy")}
                                
                             </span>
                           </div>

                           {event.type === "Physical" && (
                <div className="flex items-center text-sm text-slate-800 dark:text-slate-400 mb-1">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  <div className="line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap">
                    {formatAddress(event.address)}
                  </div>
                </div>
              )}
                         </CardContent>
                         <CardFooter className="p-4 pt-0 flex justify-between items-center">
                          {event.isFree ?(<span className='font-semibold'>Free</span>):(                           <span className="font-semibold">From ${event.price}</span>
)}
                           <Button size="sm" className='dark:text-white'>View Details</Button>
                         </CardFooter>
                       </Link>
                     </Card>
        ))}

    </div>
  )
}

export default EventsCard