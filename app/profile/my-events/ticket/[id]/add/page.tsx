import AddTicketForm from '@/src/components/ticket/AddTicketForm';
import React from 'react'
interface eventProp {
  params: Promise<{ id: string }>;
}
const page =async ({params}:eventProp) => {
  const { id } = await params;
console.log(id)
  return (
    <div className=' dark:bg-primary-900'>
      <AddTicketForm eventId={id}/>
    </div>
  )
}

export default page