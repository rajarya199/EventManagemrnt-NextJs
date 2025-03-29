import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser,updateUser } from '@/app/actions/user.actions'
import { clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data
  const eventType = evt.type

  if(eventType==="user.created"){
    const { id, email_addresses, image_url, first_name, last_name } = evt.data;

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      fname: first_name || '',
      lname: last_name || '',
      image: image_url,
    }

    const newUser=await createUser(user)
    if(newUser){
        const client = await clerkClient();
        await client.users.updateUser(id,{
            publicMetadata:{
                userId:newUser.id,
                userRole:newUser.role,
            }
        })
    }

    return NextResponse.json({message:"ok",user:newUser})
  }

  if (eventType === 'user.updated') {
    const { id, image_url, first_name, last_name } = evt.data;

    const userData = {
      fname: first_name || '',
      lname: last_name || '',
      image: image_url ,
    };

    try {
      console.log(`Updating user with clerkId ${id} with data`, userData);

      const updatedUser = await updateUser(evt.data.id, userData);
      return NextResponse.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating user:', error);
      return new Response('Error updating user', { status: 500 });
    }
  }
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
  console.log('Webhook payload:', body)

  return new Response('Webhook received', { status: 200 })
}