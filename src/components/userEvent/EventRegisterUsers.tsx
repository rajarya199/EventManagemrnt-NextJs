"use client"
import React,{useState,useEffect} from 'react'
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"
import Link from "next/link";
import { getEventRegUsers } from '@/app/actions/eventRegUser.action';
interface registerProps{
    eventId:string
}
const EventRegisterUsers = ({eventId}:registerProps) => {
    const[regUsers,setRegUsers]=useState<any[]>([])

    useEffect(()=>{
        const fetchRegUser=async()=>{
            const response = await getEventRegUsers(eventId);
            if (response.success && response.data) {
              setRegUsers(response.data);
            }
        }
        fetchRegUser();

    },[eventId])
  return (
    <div>
            <div className="p-6 bg-white dark:bg-primary-600 shadow-sm rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Event Registrations</h2>
           {regUsers.length===0?(
                    <p>No registrations yet.</p>

           ):(
            <Table>
                 <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Ticket Type</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead>Total Price</TableHead>
                            </TableRow>
                          </TableHeader>
                                    <TableBody>
                                    {regUsers.map((reg, index) =>
              reg.TicketOnBooking.map((ticket:any, i:number) => (
                <TableRow key={`${index}-${i}`} className="border border-gray-300">
                  {i === 0 && (
                    <>
                      <TableCell
                        className="border border-gray-300 px-4 py-2 font-medium"
                        rowSpan={reg.TicketOnBooking.length}
                      >
                        {reg.User.fname} {reg.User.lname} 

                      </TableCell>
                      <TableCell
                        className="border border-gray-300 px-4 py-2"
                        rowSpan={reg.TicketOnBooking.length}
                      >
                        {reg.User.email}
                      </TableCell>
                    </>
                  )}
                  <TableCell className="border border-gray-300 px-4 py-2">
                    {ticket.TicketCategory.name}
                  </TableCell>
                  <TableCell className="border border-gray-300 px-4 py-2 text-center">
                    {ticket.quantity}
                  </TableCell>
                  <TableCell className="border border-gray-300 px-4 py-2 text-center">
                    ${ticket.totalPrice.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))
            )}

                                        </TableBody>
                          
            </Table>
           )} 
</div>
  </div>
  )
}

export default EventRegisterUsers