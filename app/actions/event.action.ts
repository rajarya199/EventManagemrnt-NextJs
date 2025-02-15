"use server"
import { z } from "zod";
import { revalidatePath } from 'next/cache'
import db from '@/app/lib/db'
import { handleError } from '../lib/utiils'
import { eventFormSchema } from '@/src/lib/schema'
import { EventsType } from "@/types";
export const saveEvent=async(userId:string ,eventData:EventsType)=>{
  console.log(eventData)
    try{
        const existingUser = await db.user.findUnique({
            where: { clerkId: userId },
          });
          if (!existingUser) {
            return { success: false, message: "User not found" };
          }

          //step-create an organizer
          const organizer = await db.organizer.create({
            data: {
              organizationName: `${eventData.title} Organizer`,
            },
          });

           // Step 2: Create the Event linked to the Organizer
    const newEvent = await db.event.create({
        data: {
          ...eventData,
            // title:eventData.title,
            // eventDescription:eventData.eventDescription,
            // location:eventData.location,
            // imageUrl: eventData.imageUrl,
            // startTime: eventData.startTime,
            // endTime: eventData.endTime,
            // categoryId: eventData.categoryId,
            // price: eventData.price,
            // isFree: eventData.isFree,
            // url: eventData.url,
            // type:eventData.type,
          organizerId: organizer.id, // Link event to the organizer
        },
      });
    // Step 3: Assign the User as an OrganizerUser

       await db.organizerUser.create({
      data: {
        organizerId: organizer.id,
        userId: existingUser.id,
        role: 'Owner', 
      },
    });
    return { success: true, data: newEvent };


    }
    catch(error){
      console.error('Unexpected error:', error)
        return { success: false, message:"Error saving events",error:error};

    }
}