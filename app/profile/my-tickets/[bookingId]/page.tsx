"use client"
import React,{useState,useEffect} from 'react'
interface ticketProps{
    params:Promise<{id:string}>
}
import { useParams } from "next/navigation"; 

import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { TicketIcon } from "lucide-react";
import { getUserTickets } from '@/app/actions/ticket.action';
import { string } from 'zod';
import MyEventTicket from '@/src/components/eventTicket/MyEventTicket';
const page = () => {
    //booking id of event
    const {bookingId}=useParams<{ bookingId: string }>()
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function fetchData(){
            setLoading(true)
            try{
                const response=await getUserTickets(bookingId)
                if(response.success && response.data){
                    setTickets(response.data)
                } else{
                    console.error(response.message)
                }
            }
            catch(error){
                console.error("failed to fetch the data ")
            }
            finally{
                setLoading(false)
            }
        }
        fetchData()
    },[bookingId])
    if (loading) return <p>Loading tickets...</p>;

  return (
    <div>
  <div className="wrapper bg-primary-50">
      <h2 className="text-2xl font-bold mb-4">Your Tickets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) =>{
          return (
            <>
              <MyEventTicket ticket={ticket}/>
            </>
         

        )
        })}
      </div>
    </div>

    </div>
  )
}

export default page