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
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="shadow-lg rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TicketIcon className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold">{ticket.TicketCategory.name}</h3>
              </div>
              <p className="text-gray-600">Status: {ticket.status}</p>
            </CardContent>
            <CardFooter className="p-4 border-t bg-gray-50">
              <p className="text-sm text-gray-500">Ticket ID: {ticket.id}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>

    </div>
  )
}

export default page