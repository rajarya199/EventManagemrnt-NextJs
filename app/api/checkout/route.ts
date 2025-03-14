import { NextResponse } from "next/server";
import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs/server";

const stripe= new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
    try {
      const user = await currentUser(); 
      const userId:any = user?.publicMetadata?.userId; 
      console.log('user ko id',userId)
      const { tickets, eventId } = await req.json();
  
      // Format line items for Stripe
      const line_items = tickets.map((ticket: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: ticket.name,
            metadata: {
              ticketCategoryId: ticket.ticketCategoryId, // Store ticket category ID
          },
          },
          unit_amount: Math.round(ticket.ticketPrice * 100), // Convert to cents
        },
        quantity: ticket.quantity,
      }));
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/event/${eventId}`,
        metadata: {
          eventId,
          userId
        },
      });
  
      return NextResponse.json({ url: session.url });
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
      return NextResponse.json({ error: "Failed to create Stripe session" }, { status: 500 });
    }
  }