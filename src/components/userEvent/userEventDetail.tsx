"use client"
import React, { useState, useEffect } from 'react';
import { getEventDetail } from '@/app/actions/event.action';
import ImageSlider from '@/src/components/event/ImageSlider';
import { MapPin, Calendar ,Gift} from 'lucide-react';
import { LocationMap } from '../address/LocationMap';
import { TicketBookingCard } from '@/src/components/event/TicketBookingCard';
import EventToc from '../event/termAndConditions';
import ManageTicketCard from '../ticket/ManageTicketCard';
import Link from 'next/link';
import { Users} from "lucide-react"; 

interface eventProps {
    eventId: string;
}


const EventDetailPage = ({ eventId }: eventProps) => {
    const [eventInfo, setEventInfo] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await getEventDetail(eventId);
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
                loading...
            </div>
        );
    }
    let latitude: number | undefined;
    let longitude: number | undefined;
  
    if (eventInfo.type === "Physical") {
      const coords = eventInfo.location.split(',').map((coord: string) => parseFloat(coord.trim()));
      [latitude, longitude] = coords;
    }

    return (
        <div className='min-h-screen bg-primary-50 dark:bg-primary-900 '>
            <div className="w-full h-[500px] relative">
                <ImageSlider images={eventInfo.imageUrl} />
            </div>

            <div className=" wrapper max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <h1 className="text-4xl font-bold dark:text-gray-100 text-gray-900 mb-4">{eventInfo.title}</h1>

                        {/* Event Meta Information */}
                        <div className="flex flex-wrap gap-4 mb-6">
                            <div className="flex items-center gap-3 dark:text-gray-300 text-gray-600">
                                <Calendar className="w-5 h-5" />
                                {new Date(eventInfo.startTime).toLocaleDateString()}
                                <Calendar className="w-5 h-5" />
                                {new Date(eventInfo.endTime).toLocaleDateString()}
                            </div>
                              {eventInfo.type==="Physical" && ( <div className="flex items-center dark:text-gray-300 text-gray-600">
                                                          <MapPin className="w-5 h-5 mr-2" />
                                                          {eventInfo.address}
                                                      </div>)}
                        </div>
                        

<div className="flex justify-between items-center mb-4">
  
  <div className="flex gap-2">
    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white">
      {eventInfo.Category?.name}
    </span>
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        eventInfo.type === "Virtual"
          ? "bg-violet-100 text-violet-800"
          : "bg-teal-100 text-teal-800"
      }`}
    >
      {eventInfo.type}
    </span>
  </div>

  <Link
  href={`/profile/my-events/${eventInfo.id}/registrations`}
  className="flex items-center gap-2 p-2 rounded-lg shadow-sm border border-blue-300 text-lg font-semibold 
              hover:shadow-lg transition-all duration-200"
>
  <Users size={20} />
  View Registrations
</Link>
</div>


                        {/* Event Description */}
                        <div className="prose max-w-none mb-8">
                            <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
                            <p className=" dark:text-gray-300 text-gray-700">{eventInfo.eventDescription}</p>
                        </div>

                                     {/* Terms and Conditions */}
<EventToc eventInfo={eventInfo} eventId={eventId}
   onUpdateToc={(newToc) =>
    setEventInfo((prev: any) => ({ ...prev, toc: newToc }))
  }
/>



                    </div>


<div className="lg:col-span-1">
  {
    eventInfo.isFree ? (
      <div className="sticky top-10">
        <div className="w-full max-w-2xl rounded-2xl shadow-sm border border-gray-200">
          <div className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <Gift size={24} className="text-green-500 mr-2" />
              <h2 className="text-lg font-bold text-green-500">
                Free Event
              </h2>
            </div>
            <p className="text-gray-600">
              No ticket management
            </p>
          </div>
        </div>
      </div>
    ) : (
      <div className="sticky top-10">
        <ManageTicketCard eventId={eventId} />
      </div>
    )
  }
</div>


                </div>

 


            </div>

            {/* Location Map */}

            {eventInfo.type==="Physical" && latitude !== undefined && longitude !== undefined  &&(
                  <div className='wrapper w-full'>
                  <div className="bg-white dark:bg-primary-600 rounded-lg shadow-sm p-4">
                  <LocationMap
                      latitude={latitude}
                      longitude={longitude}
                      address={eventInfo.address}
                  />
                      
      
                </div>
      
                  </div>
            )}
        
          
        </div>
    );
}

export default EventDetailPage;
