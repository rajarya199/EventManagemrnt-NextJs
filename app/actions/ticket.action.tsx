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