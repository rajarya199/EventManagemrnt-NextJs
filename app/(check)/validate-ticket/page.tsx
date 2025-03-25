"use client"
import React,{useState,useEffect,Suspense} from 'react'
import { useUser } from '@clerk/nextjs'

import { useSearchParams } from "next/navigation";
import { validateTicket } from '@/app/actions/ticketValidation.action';


const TicketValidationPage = () => {
  // const { isLoaded, user } = useUser()
  // if (!isLoaded) return <p>Loading...</p>;
  // const userId = user?.publicMetadata?.userId;

    const searchParams = useSearchParams();
    const eventId = searchParams.get("eventId");
    const ticketId = searchParams.get("ticketId");
    const[ticketInfo,setTicketInfo]=useState<any>(null)
    useEffect(() => {
        if (eventId && ticketId) {
          validateTicket(eventId, ticketId).then(setTicketInfo);
        }
      }, [eventId, ticketId]);
      if (!eventId || !ticketId) return <p>Invalid QR Code</p>;
if(!ticketInfo) return <p>Validating tickets..</p>
  return (
    <div>
         <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      {ticketInfo.success ? (
        <div>
          <h2 className="text-xl font-bold text-green-600">Ticket Valid</h2>
          <p>Event: {ticketInfo.data.TicketCategory.Event.title}</p>
          <p>Date: {new Date(ticketInfo.data.TicketCategory.Event.startTime).toLocaleDateString()}</p>
          <p>Category: {ticketInfo.data.TicketCategory.name}</p>
          <p>Status: {ticketInfo.data.status}</p>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold text-red-600">Invalid Ticket/Access Denied</h2>
          <p>{ticketInfo.message}</p>
        </div>
      )}
    </div>
    </div>
  )
}

const WrappedPage = () => (
  <Suspense fallback={<p>Loading ticket validation...</p>}>
    <TicketValidationPage />
  </Suspense>
);

export default WrappedPage