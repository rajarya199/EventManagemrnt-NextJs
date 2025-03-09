import stripe from 'stripe'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const body = await request.text()
  
    const sig = request.headers.get('stripe-signature') as string
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!
  
    let event
  
    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    } catch (err) {
      return NextResponse.json({ message: 'Webhook error', error: err })
    }
  
    // Get the ID and type
    const eventType = event.type
  
    // CREATE
    if (eventType === 'checkout.session.completed') {
      const { id, amount_total, metadata } = event.data.object
  
    //   const order = {
    //     stripeId: id,
    //     eventId: metadata?.eventId || '',
    //     buyerId: metadata?.buyerId || '',
    //     totalAmount: amount_total ? (amount_total / 100).toString() : '0',
    //     createdAt: new Date(),
    //   }
  
    //   const newOrder = await createOrder(order)
    //   return NextResponse.json({ message: 'OK', order: newOrder })
    }
  
    return new Response('', { status: 200 })
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