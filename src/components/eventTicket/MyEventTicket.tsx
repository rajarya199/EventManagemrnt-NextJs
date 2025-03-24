import React from 'react'
import Image from 'next/image'
import { format } from "date-fns";
import { QRCodeSVG } from "qrcode.react";

import {
    CalendarDaysIcon,
    MapPinIcon,
    ClockIcon,
    UserIcon,
    TicketIcon,
    InfoIcon,
    ScissorsIcon,
  } from "lucide-react";
  interface TicketProps{
    ticket:any
  }
  const formatAddress = (address: string) => {
    // split address by comma and join ist 2 with " , space"
    return address.split(",").slice(0, 3).map(part => part.trim()).join(", ");
  };
const MyEventTicket = ({ticket}:TicketProps) => {
    const event=ticket.TicketCategory?.Event

  return (
    <div>

        <div className='bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200'>
        <div className="relative">
          <img
            src={event.imageUrl[0]}
            alt={event.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80">
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
              <h1 className="text-white text-2xl font-bold mb-4">
                {event.title}
              </h1>

              <div className='space-y-3 text-white'>
               <div className="flex items-start">
        <CalendarDaysIcon
          className={`h-5 w-5 mr-2 mt-0.5 text-white`}
        />
        <div>
          <p
            className={`text-sm text-white/80`}
          >
            Date
          </p>
          <p className="font-medium">{format(event.startTime, "MMM d, yyyy")} -{" "}
                                                                              {format(event.endTime, "MMM d, yyyy")}</p>
        </div>
                 </div>
                 <div className="flex items-start">
        <MapPinIcon
          className={`h-5 w-5 mr-2 mt-0.5 text-white`}
        />
        <div>
          <p
            className={`text-sm text-white/80`}
          >
            Location
          </p>
          <p className={`text-sm  text-white/80`}>
            {formatAddress(event.address)}
          </p>
        </div>
      </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center py-2">
            <div className="flex-grow border-t border-dashed border-gray-300"></div>
            <ScissorsIcon className="h-4 w-4 text-gray-400 mx-2" />
            <div className="flex-grow border-t border-dashed border-gray-300"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
      <div className="flex items-start">
        <UserIcon className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
        <div>
          <p className="text-sm text-gray-500">Ticket Holder</p>
          <p className="font-medium">{ticket.User.fname} {ticket.User.lname}</p>
        </div>
      </div>
      <div className="flex items-start">
        <TicketIcon className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
        <div>
          <p className="text-sm text-gray-500">Ticket Type</p>
          <p className="font-medium">{ticket.TicketCategory.name}</p>
        </div>
      </div>
      {/* {event.section && event.row && event.seat && (
        <div>
          <p className="text-sm text-gray-500">Seating</p>
          <div className="flex space-x-4 mt-1">
            <div>
              <p className="text-xs text-gray-500">Section</p>
              <p className="font-medium">A</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Row</p>
              <p className="font-medium">5</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Seat</p>
              <p className="font-medium">15</p>
            </div>
          </div>
        </div>
      )} */}
    </div>
            <div className="flex flex-col items-center justify-center">
              <QRCodeSVG
                value={`EVENT:${event.id}|TICKET:${ticket.id}`}
                size={100}
                level="H"
                marginSize={6}

              />
              <p className="text-xs text-gray-500 mt-2">{ticket.id}</p>
            </div>
          </div>
        
            <div className="flex items-start bg-gray-50 p-3 rounded">
              <InfoIcon className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <p className="text-sm">Gates open at 5:30 PM. No re-entry allowed.</p>
            </div>
          
        </div>
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <p className="text-xs text-center text-gray-500">
            Please present this ticket at the entrance. This ticket is
            non-refundable.
          </p>
        </div>

        </div>
    </div>
  )
}

export default MyEventTicket