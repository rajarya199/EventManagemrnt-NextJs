"use server"
import db from '@/app/lib/db'
import { TicketCategoryType } from '@/types';
export const addTicketcategory=async(ticketData:TicketCategoryType,eventId:string)=>{
    try{
        const existingEvent=await db.event.findUnique({
            where:{id:eventId}
        })
        if (!existingEvent) {
            return { success: false, message: "Event not found" };
          }
       const newTicketCategory=await db.ticketCategory.create({
        data:{
            ...ticketData,
            eventId:eventId
        }
       })
       return { success: true, data: newTicketCategory };
    }
    catch(error){
        console.error("Error:", error);
        return { success: false, message: "An unexpected error occurred" };
    }
}

export const getEventTicketCategories=async(eventId:string)=>{
    try{
        const existingEvent=await db.event.findUnique({
            where:{id:eventId}
        })
        if (!existingEvent) {
            return { success: false, message: "Event not found" };
          }
          const ticketCategories=await db.ticketCategory.findMany({
            where:{eventId:eventId},
            include:{Tickets:true}
          })
          return{success:true,data:ticketCategories}
    }
    catch(error){
        console.error("Error:", error);
        return { success: false, message: "An unexpected error occurred" };
    }
}

export async function getUserTickets(bookingId: string) {
    try {
      const tickets = await db.ticket.findMany({
        where: {
          TicketOnBooking: {
            bookingId: bookingId, 
          },
        },
        include: {
          TicketCategory: true,
          TicketOnBooking: true,
        },
      });
  
      return { success: true, data: tickets };
    } catch (error) {
      console.error("Error fetching tickets:", error);
      return { success: false, message: "Error fetching tickets" };
    }
  }