import EventHeader from '@/src/components/event/EventHeader';
import TicketHeadSection from '@/src/components/ticket/TicketHeadSection';
import EventRegisterUsers from '@/src/components/userEvent/EventRegisterUsers';
import React from 'react'
interface registerProp{
    params: Promise<{ id: string }>;

}
const page =async ({params}:registerProp) => {
    const { id } = await params;

  return (
    <div className='bg-primary-50 min-h-screen'>
        <div className='wrapper'>
        <div className='mb-4'>
        <EventHeader eventId={id}/>
      </div>
        </div>
        </div>
  )
}

export default page