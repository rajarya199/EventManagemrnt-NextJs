import EventForm from '@/src/components/event/EventForm'
import React from 'react'
import { auth } from '@clerk/nextjs/server'

const AddEvent = async () => {
    const { userId,redirectToSignIn } = await auth()
    if (!userId) return redirectToSignIn()


    return (
    <>
       <section className='bg-primary-50 dark:bg-primary-900 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <h3 className='wrapper  h3-bold text-center sm:text-left'>
        Create Your Event    
        </h3>
        </section>
        <div className=' dark:bg-primary-900'>
        <div className='wrapper py-8'>
            <EventForm userId={userId} eventType="Add"/>

        </div>
        </div>
        
    </>
 
  )
}

export default AddEvent