
import React from 'react'
import { auth } from '@clerk/nextjs/server'
import UserBookings from '@/src/components/bookings/UserBookings';
import UserEventRegistration from '@/src/components/registration/UserEventRegistration';

const page = async() => {
    const { sessionClaims } = await auth();
    const userId = sessionClaims?.id as string;
  return (
    <div className="wrapper bg-primary-50 dark:bg-primary-900">
      <UserEventRegistration userId={userId}/>
    </div>
  )
}

export default page