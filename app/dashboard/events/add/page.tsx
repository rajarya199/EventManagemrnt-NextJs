import React from 'react'
import { auth } from '@clerk/nextjs/server'
import EventForm from '@/src/components/event/EventForm'
const page = async() => {
      const { userId,redirectToSignIn } = await auth()
        if (!userId) return redirectToSignIn()
  return (
    <div>
        <EventForm userId={userId} eventType="Add"/>
    </div>
  )
}

export default page