import PastEventDetail from '@/src/components/pastEvents/PastEventDetail';
import React from 'react'
interface eventProp {
    params: Promise<{ id: string }>;
  }
const page = async({params}:eventProp) => {
    const {id}=await params
  return (
    <div>
        <PastEventDetail eventId={id}/>

    </div>
  )
}

export default page