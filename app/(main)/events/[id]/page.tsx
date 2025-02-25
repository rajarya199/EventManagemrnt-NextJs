import EventDetailPage from '@/src/components/event/EventDetailPage';
import React from 'react'
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