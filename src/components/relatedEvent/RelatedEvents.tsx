"use client"
import { getRelatedEvents } from '@/app/actions/event.action';
import React,{useEffect,useState} from 'react'
import { EventGrid } from "@/src/components/event/EventGrid";

interface eventProps{
    eventId:string,
    categoryId:string
}
const RelatedEvents = ({eventId,categoryId}:eventProps) => {
    const [relatedEvents, setRelatedEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(()=>{
        const fetchEvent=async()=>{
            try{
                const response=await getRelatedEvents(categoryId,eventId)
                if (response.success && response.data) {
                    setRelatedEvents(response.data);
                  } else {
                    console.error("Failed to fetch events");
                  }
            }
            catch(error){
                console.error("Failed to fetch events");

            }
        };
        fetchEvent()
    },[])
  return (
    <div className='wrapper'>
            <h2 className="text-2xl font-semibold mb-4 ">Related Events</h2>
<div>
  <EventGrid events={relatedEvents}/>
</div>
    </div>
  )
}

export default RelatedEvents