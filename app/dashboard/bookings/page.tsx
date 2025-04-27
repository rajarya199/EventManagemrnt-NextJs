import BookingSection from '@/src/components/bookingInfo/BookingSection'
import React from 'react'

const page = () => {
  return (
    <div>
         <div className='p-6'>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-200">
            Bookings
        </h1>

      </div>
      <BookingSection/>
    </div>
  )
}

export default page