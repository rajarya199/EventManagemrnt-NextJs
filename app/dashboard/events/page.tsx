import EventSection from '@/src/components/event/EventSection'
import EventTable from '@/src/components/event/EventTable'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className='p-6'>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Events
        </h1>

      </div>
      <div className='shadow-sm rounded-lg'>
      <EventSection/>
      
      </div>
    </div>
  )
}

export default page