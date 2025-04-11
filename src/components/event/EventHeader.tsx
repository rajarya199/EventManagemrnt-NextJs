"use client";
import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Tag, ChevronDown, ChevronUp,Plus} from "lucide-react";
import { getEventInfo } from '@/app/actions/event.action';
import Link from 'next/link';
import EventRegisterUsers from '../userEvent/EventRegisterUsers';
import FreeEventRegUser from '../userEvent/FreeEventRegUser';
interface EventProps {
    eventId: string;
}

const EventHeader = ({eventId}:EventProps) => {
        const [eventInfo, setEventInfo] = useState<any>(null);
        const [loading, setLoading] = useState<boolean>(true);
        const [showFullAddress, setShowFullAddress] = useState(false);
           useEffect(() => {
                async function fetchData() {
                    setLoading(true);
                    try {
                        const response = await getEventInfo(eventId);
                        if (response.success && response.data) {
                            setEventInfo(response.data);
                        } else {
                            console.error("Failed to fetch data");
                        }
                    } catch (error) {
                        console.error("Failed to fetch data", error);
                    } finally {
                        setLoading(false);
                    }
                }
                fetchData();
            }, [eventId]);
            if (loading) {
                return (
                    <div className="flex justify-center items-center my-20 h-full">
                        Loading...
                    </div>
                );
            }
            const fullAddress = eventInfo.address;
            const formatAddress = (address: string) => {
                return address.split(",").slice(0, 2).map(part => part.trim()).join(", ");
              };        
  return (
    <div>
        <div className='mb-4'>
        <header className="w-full rounded-lg shadow-md bg-white border-b">
    <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-start">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">{eventInfo.title}</h1>
                <div className="flex flex-wrap gap-4 text-gray-600">
                   
                            {eventInfo.type==="Physical" && (   <div className='flex flex-col'>
                                <div className="flex items-center gap-2">
                                    <MapPin size={18} />
                                    <span>{formatAddress(eventInfo.address)}</span>
                                    <button
                                        onClick={() => setShowFullAddress(!showFullAddress)}
                                        className="inline-flex items-center text-blue-600 hover:text-blue-700"
                                    >
                                        {showFullAddress ? (
                                            <ChevronUp size={16} />
                                        ) : (
                                            <ChevronDown size={16} />
                                        )}
                                    </button>
                                </div>
                                {showFullAddress && (
                                    <div className="mt-2 ml-6 text-sm text-gray-500 max-w-xl">
                                        {fullAddress}
                                    </div>
                                )}
                            </div>
)}
                    <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        <span>{eventInfo.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Tag size={18} />
                        <span>{eventInfo.Category.name}</span>
                    </div>
                </div>
            </div>
 
        </div>
    </div>
</header>
        </div>

{
  eventInfo && eventInfo.isFree !== undefined && eventInfo.isFree ? (
    <FreeEventRegUser eventId={eventId}/>
  ) : (
    <EventRegisterUsers eventId={eventId} />
  )
}



    </div>

  )
}

export default EventHeader