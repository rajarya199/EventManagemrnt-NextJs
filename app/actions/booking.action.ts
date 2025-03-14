"use server"
import db from '@/app/lib/db'



export const handleBooking = async (session: any) => {
  

  try {
   
    if (!session.metadata) throw new Error("Session metadata is missing");

    const userId = session.metadata.userId;
    if (!userId) throw new Error("UserId missing in Stripe session metadata");

    const eventId = session.metadata.eventId;
    const totalAmount = session.amount_total! / 100;

    // Create Booking
    const booking = await db.booking.create({
      data: {
        userId: userId ,
        eventId,
        totalAmount,
        status: "Confirmed",
      },
    });

    // Fetch line items
    const lineItems = await fetchStripeLineItems(session.id);
    if (!lineItems) throw new Error("Failed to fetch Stripe line items");

    for (const item of lineItems) {
      const ticketCategoryId = item.price.metadata.ticketCategoryId;
      const quantity = item.quantity;
      const totalPrice = item.amount_total / 100;

      // Create TicketOnBooking record
      const ticketOnBooking = await db.ticketOnBooking.create({
        data: {
          bookingId: booking.id,
          ticketCategoryId,
          quantity,
          totalPrice,
        },
      });

      // Create Individual Tickets
      const ticketPromises = Array.from({ length: quantity }).map(() =>
        db.ticket.create({
          data: {
            ticketCategoryId,
            bookedById: userId ,
            status: "Booked",
            ticketOnBookingId: ticketOnBooking.id,
          },
        })
      );
      await Promise.all(ticketPromises);

      // Reduce available stock
      await db.ticketCategory.update({
        where: { id: ticketCategoryId },
        data: { totalStock: { decrement: quantity } },
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Booking Action Error:", error);
    return { success: false, error: (error as Error).message };
  }
};

// Helper function to fetch line items
const fetchStripeLineItems = async (sessionId: string) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  console.log("Fetching line items for session:", sessionId);

  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
    console.log("Fetched line items:", lineItems.data);

    return lineItems.data;
  } catch (error) {
    console.error("Error fetching Stripe line items:", error);
    return null;
  }
};
