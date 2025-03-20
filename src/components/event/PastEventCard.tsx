import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from "date-fns";
import { Calendar, MapPin, Search } from "lucide-react"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardFooter } from "@/src/components/ui/card"
interface pastEventProps{
    events:any[]
}
const PastEventCard = ({events}:pastEventProps) => {
  return (
    <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event)=>(
                  <Card key={event.id} className="overflow-hidden transition-all hover:shadow-md group">
                  <Link href={`/past-event`} className="block">
                
                    <div className="relative h-64">
                      <Image
                        src={event.imageUrl[0]}
                        alt={event.title}
                        fill
                        className="object-cover transition-all duration-300 group-hover:brightness-75"
                      />
                    </div>
            
                    
                    <CardFooter className="p-4 flex flex-col items-start">
                      <h3 className="text-lg font-semibold text-slate-900">{event.title}</h3>
                      <div className="text-sm text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {format(event.startTime, "MMM d, yyyy")} - {format(event.endTime, "MMM d, yyyy")}
                      </div>
                    </CardFooter>
                  </Link>
                </Card>
        ))}

    </div>
    </div>
  )
}

export default PastEventCard