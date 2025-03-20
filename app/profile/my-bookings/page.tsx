
import React from 'react'
import { auth } from '@clerk/nextjs/server'
import UserBookings from '@/src/components/bookings/UserBookings';

const page = async() => {
    const { sessionClaims } = await auth();
    const userId = sessionClaims?.id as string;
  return (
    <div className="wrapper bg-primary-50">
        <UserBookings userId={userId}/>
    </div>
  )
}

export default page