import PastEventCard from '@/src/components/hero/PastEventCard'
import React from 'react'

const page = () => {
  return (
    <div className='bg-primary-50 dark:bg-primary-900'>
        <div className='wrapper'>
        <h2 className="text-2xl font-semibold p-2">Past Events</h2>
        <PastEventCard/>
        </div>
 
    </div>
  )
}

export default page