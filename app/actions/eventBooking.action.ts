"use server"
import db from '@/app/lib/db'

export async function getAllBookings(){
    try{
        const bookings=await db.booking.findMany({
            include:{
                Event:true,
                User:true,
                TicketOnBooking:{
                    include:{
                        TicketCategory:true,
                        Tickets:true, 
                    },
                },
            },
            orderBy: {
                createdAt: "desc", //most recent bookings first
              },
            })
            return { success: true, data: bookings };

    }
    catch(error){
        console.error("unexpected error occured",error)
        return { success: false, message: 'An unexpected error occurred' }
    }
}