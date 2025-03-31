import { OrganizerCard } from '@/src/components/organizer/organizerCard'
import OrganizerSection from '@/src/components/organizer/OrganizerSection'
import React from 'react'

const page = () => {
  return (
    <div>
         <div className='p-6'>
      <h1 className="text-2xl font-semibold text-gray-900">
            Organizers
        </h1>
    {/* <div className='p-2 mt-2' >
        <OrganizerCard/>
    </div> */}
    <OrganizerSection />
      </div>
    </div>
  )
}

export default page