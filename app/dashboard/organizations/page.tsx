import OrganizationSection from '@/src/components/organization/OrganizationSection'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className='p-6'>
      <h1 className="text-2xl font-semibold text-gray-900">
            Organization
        </h1>

      </div>
      <div className='shadow-sm rounded-lg'>
      <OrganizationSection/>
      </div>
    </div>
  )
}

export default page