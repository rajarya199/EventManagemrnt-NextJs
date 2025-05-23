import React from 'react'
import { Search, Plus, Filter } from "lucide-react";
import TicketHeadSection from '@/src/components/ticket/TicketHeadSection';
import { TicketCard } from '@/src/components/ticket/TicketCard';
interface eventProp {
    params: Promise<{ id: string }>;
  }
const page =  async({params}:eventProp) => {
    const { id } = await params;
  return (
    <div className=' bg-primary-50 dark:bg-primary-900 min-h-screen'>
      <div className='wrapper'>
      <div>
        <TicketHeadSection eventId={id}/>
      </div>
      <TicketCard eventId={id}/>

      </div>
   
    </div>
  )
}

export default page