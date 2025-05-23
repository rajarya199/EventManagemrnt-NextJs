"use client"
import React, { useEffect, useState } from "react";
import Image from 'next/image'
import Link from 'next/link'
import { format } from "date-fns";
import { Calendar, MapPin, Search } from "lucide-react"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardFooter } from "@/src/components/ui/card"
import { getPastEvents } from "@/app/actions/pastEvent.action";
const defaultImg="/assets/images/no-event.png"

const PastEventCard = () => {
            const [events,setEvents]=useState<any[]>([])
            useEffect(() => {
                const fetchEvents = async () => {
                  try {
                    const response = await getPastEvents();
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
              }, [])

              const pastEvent=events.slice(0,6)
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pastEvent.map((event)=>(
                  <Card key={event.id} className="overflow-hidden transition-all hover:shadow-md group">
                  <Link href={`/past-event/${event.id}`} className="block">
                
                    <div className="relative h-64">
                      <Image
                                    src={event.imageUrl && event.imageUrl[0] ? event.imageUrl[0] : defaultImg}

                        alt={event.title}
                        fill
                        className="object-cover transition-all duration-300 group-hover:brightness-75"
                      />
                    </div>
            
                    
                    <CardFooter className="p-4 flex flex-col items-start">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{event.title}</h3>
                      <div className="text-sm text-slate-600 dark:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {format(event.startTime, "MMM d, yyyy")} - {format(event.endTime, "MMM d, yyyy")}
                      </div>
                    </CardFooter>
                  </Link>
                </Card>
        ))}

    </div>
    )
}

export default PastEventCard