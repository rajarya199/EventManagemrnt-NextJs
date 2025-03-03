
import React from "react";
import { MapPin, Calendar, DollarSign, User } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
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
interface EventProps{
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

export const EventGrid = ({ events }: EventProps) => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200"
        >
        
          <Link href={`/events/${event.id}`}>
            <img
              src={event.imageUrl[0]}
              alt={event.title}
              className="w-full h-56 object-cover cursor-pointer"
            />
          </Link>

          <div className="p-6">
            <div className="flex gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-sm font-medium">
                {event.Category?.name}
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
              <h3 className="text-xl font-semibold mb-2 text-gray-900 hover:text-blue-600 transition-colors duration-200">
                {event.title}
              </h3>
            </Link>

            <p className="text-gray-800 mb-4 line-clamp-1 text-sm">
              {event.eventDescription}
            </p>

            <div className="space-y-3 text-gray-800">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-red-800" />
                <span className="line-clamp-1">{event.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-blue-700" />
                <span>
                  {format(event.startTime, "MMM d, yyyy")} -{" "}
                  {format(event.endTime, "MMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-gray-400" />
                <span>${event.price}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

