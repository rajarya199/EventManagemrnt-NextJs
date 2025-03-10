import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe= new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
    try {
      const { tickets, eventId } = await req.json();
  
      // Format line items for Stripe
      const line_items = tickets.map((ticket: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: ticket.name,
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
        },
      });
  
      return NextResponse.json({ url: session.url });
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
      return NextResponse.json({ error: "Failed to create Stripe session" }, { status: 500 });
    }
  }