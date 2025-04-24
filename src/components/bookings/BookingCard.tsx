import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { Calendar, Ticket } from "lucide-react";
import { Badge } from "@/src/components/ui/badge"

import Image from "next/image";
import { format } from "date-fns";
interface BookingProps{
    booking:any
}
export default function BookingCard({ booking }:BookingProps) {
  return (
    <Card className="overflow-hidden shadow-md">
      <div className="relative h-56">
        <Image
          src={booking.Event.imageUrl[0]}
          alt={booking.Event.title}
          fill
          className="object-cover"
        />
         <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
          Registered
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="text-lg font-semibold dark:text-slate-100 text-slate-900">{booking.Event.title}</h3>
        <div className="flex items-center text-sm dark:text-gray-300 text-slate-600 mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          <span>
            {format(new Date(booking.Event.startTime), "MMM d, yyyy")}
          </span>
        </div>

        {/* Ticket Categories */}
        <div className="text-sm">
          {booking.TicketOnBooking.map((ticket:any) => (
           <div key={ticket.id} className="flex justify-between items-center gap-2">
           <div className="flex items-center gap-1">
             <Ticket className="h-4 w-4 text-blue-600" />
             <span>
               {ticket.TicketCategory.name}
             </span>
           </div>
           <span className="font-semibold">
             × {ticket.quantity}
           </span>
         </div>
         
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 flex justify-between items-center border-t">
        <span className="font-semibold text-lg">${booking.totalAmount.toFixed(2)}</span>
        <span
          className={`px-3 py-1 rounded-md text-sm ${
            booking.status === "Confirmed" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {booking.status}
        </span>
      </CardFooter>
    </Card>
  );
}
