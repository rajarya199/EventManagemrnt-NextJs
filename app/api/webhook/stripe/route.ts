import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { handleBooking } from '@/app/actions/booking.action'
const stripe= new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
    const body = await request.text()
  
    const sig = request.headers.get('stripe-signature') as string
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!
  
    let event
  
    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    } catch (err:any) {
      console.error("⚠️ Webhook Error:", err.message);

      return NextResponse.json({ message: 'Webhook error', error: err })
    }
  
    // Get the ID and type
    const eventType = event.type
  
    // CREATE
    if (eventType === 'checkout.session.completed') {
      // const { id, amount_total, metadata } = event.data.object
  
      const session = event.data.object as Stripe.Checkout.Session;
      const result = await handleBooking(session);
  
      if (!result.success) {
        return new NextResponse(`Booking Error: ${result.error}`, { status: 500 });
      }

      return NextResponse.json({ message: "Booking successful!" }, { status: 200 });

    }
    return NextResponse.json({ message: "Unhandled event type" }, { status: 400 });

  }


// app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
//   const sig = request.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//   } catch (err) {
//     response.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'checkout.session.completed':
//       const checkoutSessionCompleted = event.data.object;
//       // Then define and call a function to handle the event checkout.session.completed
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// });

// app.listen(4242, () => console.log('Running on port 4242'));