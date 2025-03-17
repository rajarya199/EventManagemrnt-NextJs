
import React from 'react'
import { auth } from '@clerk/nextjs/server'
import UserBookings from '@/src/components/bookings/UserBookings';

const page = async() => {
    const { sessionClaims } = await auth();
    const userId = sessionClaims?.id as string;
  return (
    <div>
        <UserBookings userId={userId}/>
    </div>
  )
}

export default page