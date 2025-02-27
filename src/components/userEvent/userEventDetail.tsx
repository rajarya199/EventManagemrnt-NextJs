"use client"
import React, { useState, useEffect } from 'react';
import { getEventDetail } from '@/app/actions/event.action';
import ImageSlider from '@/src/components/event/ImageSlider';
import { MapPin, Calendar } from 'lucide-react';
import { LocationMap } from '../address/LocationMap';
import { TicketBookingCard } from '@/src/components/event/TicketBookingCard';

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

    // Extract latitude and longitude from location
    const [latitude, longitude] = eventInfo.location.split(',').map((coord: string) => parseFloat(coord.trim()));

    return (
        <div className='min-h-screen bg-primary-50 '>
            <div className="w-full h-[500px] relative">
                <ImageSlider images={eventInfo.imageUrl} />
            </div>

            <div className=" wrapper max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{eventInfo.title}</h1>

                        {/* Event Meta Information */}
                        <div className="flex flex-wrap gap-4 mb-6">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Calendar className="w-5 h-5" />
                                {new Date(eventInfo.startTime).toLocaleDateString()}
                                <Calendar className="w-5 h-5" />
                                {new Date(eventInfo.endTime).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-gray-600">
                                <MapPin className="w-5 h-5 mr-2" />
                                {eventInfo.address}
                            </div>
                        </div>
                        <div className="flex gap-2 mb-4">
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white`}
                            >
                                {eventInfo.Category?.name}
                            </span>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${eventInfo.type === "Virtual" ? "bg-violet-100 text-violet-800" : "bg-teal-100 text-teal-800"}`}
                            >
                                {eventInfo.type}
                            </span>
                        </div>

                        {/* Event Description */}
                        <div className="prose max-w-none mb-8">
                            <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
                            <p className="text-gray-700">{eventInfo.eventDescription}</p>
                        </div>

                                     {/* Terms and Conditions */}
                                     <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
  <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
  <ul className="list-disc list-outside pl-4 marker:text-gray-700"> 
    {eventInfo.toc.map((term: any, index: number) => (
      <li key={index} className="text-gray-700">{term}</li>
    ))}
  </ul>
</div>


                    </div>
           
                </div>

 


            </div>

            {/* Location Map */}
            <div className='wrapper w-full'>
            <div className="bg-white rounded-lg shadow-sm p-4">
            <LocationMap
                latitude={latitude}
                longitude={longitude}
                address={eventInfo.address}
            />
                

          </div>

            </div>
          
        </div>
    );
}

export default EventDetailPage;
