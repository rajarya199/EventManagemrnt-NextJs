
import React from "react";
import { MapPin, Calendar, DollarSign, User } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

interface EventProps{
    events:any[]
    name:string
}

const formatAddress = (address: string) => {
  // split address by comma and join ist 2 with " , space"
  return address.split(",").slice(0, 2).map(part => part.trim()).join(", ");
};
const defaultImg="/assets/images/no-event.png"

export const CategoryEvent = ({ events,name }: EventProps) => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-white dark:bg-primary-600 rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200"
        >
        
          <Link href={`/events/${event.id}`}>
            <img     
              src={event.imageUrl && event.imageUrl[0] ? event.imageUrl[0] : defaultImg}
              alt={event.title}
              className="w-full h-56 object-cover cursor-pointer"
            />
          </Link>

          <div className="p-4">
            <div className="flex gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white">
                {name}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  event.type === "Virtual"
                    ? "bg-violet-100 text-violet-800"
                    : "bg-teal-100 text-teal-800"
                }`}
              >
                {event.type}
              </span>
            </div>

        
            <Link href={`/events/${event.id}`} className="block">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:dark:text-blue-400 transition-colors duration-200">
                {event.title}
              </h3>
            </Link>

            {/* <p className="text-gray-800 mb-4 line-clamp-1 text-sm">
              {event.eventDescription}
            </p> */}

            <div className="space-y-2 text-gray-800 dark:text-gray-200">
            <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} className="text-blue-700" />
                <span>
                  {format(event.startTime, "MMM d, yyyy")} -{" "}
                  {format(event.endTime, "MMM d, yyyy")}
                </span>
              </div>

              {event.type==="Physical" && (
                            <div className="flex items-center gap-2 text-sm">
                            <MapPin size={16} className="text-red-800 flex-shrink-0" />
                            <span className="line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap">{formatAddress(event.address)}</span>
                          </div>
              )}


            

            </div>
            <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl mt-4 p-2">
  {event.isFree ? (
    <div className="flex justify-center w-full">
      <span className="font-semibold  text-blue-600">Free Event</span>
    </div>
  ) : (
    <>
      <span className="font-semibold text-black dark:text-gray-100">From</span>
      <span className="font-semibold  text-blue-600 dark:text-blue-400">${event.price}</span>
    </>
  )}
</div>

          </div>
        </div>
      ))}
    </div>
  );
};

