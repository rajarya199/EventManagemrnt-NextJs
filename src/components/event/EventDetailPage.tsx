"use client"
import React, { useState, useEffect ,useRef} from 'react';
import { getEventDetail } from '@/app/actions/event.action';
import ImageSlider from './ImageSlider';
import { MapPin, Calendar } from 'lucide-react';
import { LocationMap } from '../address/LocationMap';
import { TicketBookingCard } from './TicketBookingCard';
import { EventTicketCard } from '../ticket/EventTicketCard';
import FreeTicketCard from './FreeTicketCard';
import RelatedEvents from '../relatedEvent/RelatedEvents';

interface eventProps {
    eventId: string;
}

// const eventTicket=[
//     {
//         name: "General Admission",
//         price: 49.99,
//         features: [
//           "Access to all main stages",
//           "Food court access",
//           "Basic amenities",
//         ],
//         isFeatured: false,
//       },
//       {
//         name: "VIP Pass",
//         price: 149.99,
//         features: [
//           "Premium viewing areas",
//           "Exclusive lounge access",
//           "Complimentary drinks",
//           "Meet & Greet",
//         ],
//         isFeatured: true,
//       },
//       {
//         name: "Premium Experience",
//         price: 249.99,
//         features: [
//           "Front row seating",
//           "Backstage tour",
//           "VIP parking",
//           "All inclusive F&B",
//           "Exclusive merchandise",
//         ],
//         isFeatured: false,
//       },
// ]

const EventDetailPage = ({ eventId }: eventProps) => {
    const [eventInfo, setEventInfo] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const ticketBookingRef = useRef<HTMLDivElement | null>(null);

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

   
  // Extract latitude and longitude from location only for physical events
  let latitude: number | undefined;
  let longitude: number | undefined;

  if (eventInfo.type === "Physical") {
    const coords = eventInfo.location.split(',').map((coord: string) => parseFloat(coord.trim()));
    [latitude, longitude] = coords;
  }

  // Scroll function
  const scrollToTicketBooking = () => {
    if (ticketBookingRef.current) {
      ticketBookingRef.current.scrollIntoView({ behavior: "smooth" ,block: "start"});
    }
  };
    return (
        <div className='min-h-screen bg-primary-50 dark:bg-primary-900 '>
            <div className="w-full h-[500px] relative">
                <ImageSlider images={eventInfo.imageUrl} />
            </div>

            <div className=" wrapper max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">{eventInfo.title}</h1>

                        {/* Event Meta Information */}
                        <div className="flex flex-wrap gap-4 mb-6">
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                <Calendar className="w-5 h-5" />
                                {new Date(eventInfo.startTime).toLocaleDateString()}
                                <Calendar className="w-5 h-5" />
                                {new Date(eventInfo.endTime).toLocaleDateString()}
                            </div>
                            {eventInfo.type==="Physical" && ( <div className="flex items-center text-gray-600 dark:text-gray-300">
                                <MapPin className="w-5 h-5 mr-2" />
                                {eventInfo.address}
                            </div>)}
                           
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
                            <p className="text-gray-700 dark:text-gray-300">{eventInfo.eventDescription}</p>
                        </div>

                                     {/* Terms and Conditions */}
                                     <div className="bg-white dark:bg-primary-600 rounded-lg shadow-sm p-6 mb-8">
  <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
  <ul className="list-disc list-outside pl-4 marker:text-gray-700"> 
    {eventInfo.toc.map((term: any, index: number) => (
      <li key={index} className="text-gray-700 dark:text-gray-300">{term}</li>
    ))}
  </ul>
</div>
{eventInfo.type==="Physical" && latitude !== undefined && longitude !== undefined  && (<div className=' w-full'>
            <div className="bg-white dark:bg-primary-600 rounded-lg shadow-sm p-4">
            <LocationMap
                latitude={latitude}
                longitude={longitude}
                address={eventInfo.address}
            />
                

          </div>

            </div>)}


                    </div>



                    <div className="lg:col-span-1" ref={ticketBookingRef}>
            <div className="sticky top-8">
                {eventInfo.isFree ? (<FreeTicketCard event={eventInfo}/>) :(<TicketBookingCard tickets={eventInfo.TicketCategories} eventId={eventId} />
)}
            </div>
          </div>
                </div>
            </div>
            <div>
            {eventInfo.isFree ? (''):(  <EventTicketCard eventId={eventId} scrollToBooking={scrollToTicketBooking} />
)}

            </div>

            <div>
                <RelatedEvents eventId={eventId} categoryId={eventInfo.categoryId}/>
            </div>
        </div>
    );
}

export default EventDetailPage;
