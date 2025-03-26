"use server"
import db from '@/app/lib/db'
import { currentUser } from '@clerk/nextjs/server'

export async function validateTicket(eventId:string,ticketId:string){
    try{
        const user = await currentUser()
        if (!user) {
            return { success: false, message: "Unauthorized: Please log in." };
          }
          const userId = user.publicMetadata?.userId as string
          if (!userId) {
            return { success: false, message: "User ID not found in metadata." };
        }
        const ticket=await db.ticket.findUnique({
            where:{id:ticketId},
            include:{
                TicketCategory:{
                    include:{Event:{
include:{Organizer:true}
                    }}
                },
            },
        })
        if(!ticket){
            return{success:false,message:"Invalid ticket"}
        }

        const event = ticket.TicketCategory.Event;
        const organizer=event.Organizer
           // Ensure the logged-in user is the event organizer
           if (!organizer || organizer.userId !== userId) {
            console.warn(`Access denied: User ${userId} is not the organizer of event ${event.id}`);
            return { success: false, message: "Access denied: You are not the organizer of this event." };
        }

            // Ensure ticket belongs to the right event

        if (event.id !== eventId) {
            return { success: false, message: "Ticket does not match this event" };
          }

          if (ticket.status==="CheckedIn"){
            return { success: false, message: "Ticket already used" };

          }
          
          //update ticket status
          await db.ticket.update({
            where: { id: ticketId },
            data: { status: "CheckedIn" },
          });
          return { success: true, data: ticket };
     

    }
    catch(error){
        console.error("Error validating ticket:", error);
        return { success: false, message: "Error validating ticket" };

    }
}