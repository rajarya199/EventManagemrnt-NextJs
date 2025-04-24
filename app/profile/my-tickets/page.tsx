import React from 'react'
import { auth } from '@clerk/nextjs/server'
import EventTicketCard from '@/src/components/eventTicket/EventTicketCard';

const page = async() => {
        const { sessionClaims } = await auth();
        const userId = sessionClaims?.id as string;
  return (
    <div className='bg-primary-50 dark:bg-primary-900 wrapper'>
        <EventTicketCard userId={userId}/>
    </div>
  )
}

export default page