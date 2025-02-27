import React from 'react'
import EventDetailPage from '@/src/components/userEvent/userEventDetail';
interface eventProp {
    params: Promise<{ id: string }>;
  }
const page = async({params}:eventProp) => {
    const { id } = await params; 
  return (
    <div>
        <EventDetailPage eventId={id} />
    </div>
  )
}

export default page