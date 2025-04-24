// eventList.tsx
import React from "react";
import { MapPin, Calendar, DollarSign, User } from "lucide-react";
import { format } from "date-fns";

const getStatusColor = (status:string) => {
  switch (status) {
    case "upcoming":
      return "bg-emerald-100 text-emerald-800";
    case "ongoing":
      return "bg-blue-100 text-blue-800";
    case "ended":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
interface eventProps{
    events:any[]
}
// const getCategoryColor = (category) => {
//   switch (category) {
//     case "Technology":
//       return "bg-purple-100 text-purple-800";
//     case "Business":
//       return "bg-blue-100 text-blue-800";
//     case "Arts":
//       return "bg-pink-100 text-pink-800";
//     case "Sports":
//       return "bg-orange-100 text-orange-800";
//     case "Music":
//       return "bg-indigo-100 text-indigo-800";
//     default:
//       return "bg-gray-100 text-gray-800";
//   }
// };


const formatAddress = (address: string) => {
  // split address by comma and join ist 2 with " , space"
  return address.split(",").slice(0, 3).map(part => part.trim()).join(", ");
};
const defaultImg="/assets/images/no-event.png"

export const EventList = ({ events }: eventProps) => {
  return (
    <div className="grid gap-6 grid-cols-1">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-white dark:bg-primary-600 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 flex"
        >
          {/* Fixed Image Size (Full Height) */}
          <div className="relative w-56 h-full flex-shrink-0">
            <img
                          src={event.imageUrl && event.imageUrl[0] ? event.imageUrl[0] : defaultImg}

              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Event Details (Full Height Card) */}
          <div className="p-6 flex flex-col justify-between flex-grow min-h-[220px]">
            {/* Categories & Type */}
            <div className="flex gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-sm font-medium">
                {event.Category?.name}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  event.type === "Virtual" ? "bg-violet-100 text-violet-800" : "bg-teal-100 text-teal-800"
                }`}
              >
                {event.type}
              </span>
            </div>

            {/* Event Title */}
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{event.title}</h3>

            
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm hidden lg:block">
              {event.eventDescription}
            </p>

            {/* Event Details (Location, Date, Price) */}
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            {event.type==="Physical" && ( <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-400  flex-shrink-0" />
                <span className="  whitespace-normal sm:overflow-hidden sm:text-ellipsis sm:line-clamp-1 sm:whitespace-nowrap">
                  {formatAddress(event.address)}
                </span>
              </div>)}


             

            
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-400 flex-shrink-0" />
                <span>
                  {format(event.startTime, "MMM d, yyyy")} - {format(event.endTime, "MMM d, yyyy")}
                </span>
              </div>

              
              <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-gray-400 flex-shrink-0" />
                <span>${event.price}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

