"use server"
import db from '@/app/lib/db'
export async function getUserBookings(userId: string) {
    try {
      const bookings = await db.booking.findMany({
        where: {
          userId,
        },
        include: {
          Event: true, 
          TicketOnBooking: {
            include: {
              TicketCategory: true, 
              Tickets: true, // Include individual ticket info
            },
          },
        },
        orderBy: {
          createdAt: "desc", //most recent bookings first
        },
      });
  
      return { success: true, data: bookings };
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      return { success: false, message: "Error fetching user bookings" };
    }
  }
  