"use server"
import { z } from "zod";
import { revalidatePath } from 'next/cache'
import db from '@/app/lib/db'
import { handleError } from '../lib/utiils'
import { eventFormSchema } from '@/src/lib/schema'
import { EventsType } from "@/types";
import { userAgent } from "next/server";
// export const saveEvent=async(userId:string ,eventData:EventsType)=>{
//   console.log(eventData)
//     try{
//         const existingUser = await db.user.findUnique({
//             where: { clerkId: userId },
//           });
//           if (!existingUser) {
//             return { success: false, message: "User not found" };
//           }

//           //step-create an organizer
//           const organizer = await db.organizer.create({
//             data: {
//               organizationName: `${eventData.title} Organizer`,
//             },
//           });

//            // Step 2: Create the Event linked to the Organizer
//     const newEvent = await db.event.create({
//         data: {
//           ...eventData,
//             // title:eventData.title,
//             // eventDescription:eventData.eventDescription,
//             // location:eventData.location,
//             // imageUrl: eventData.imageUrl,
//             // startTime: eventData.startTime,
//             // endTime: eventData.endTime,
//             // categoryId: eventData.categoryId,
//             // price: eventData.price,
//             // isFree: eventData.isFree,
//             // url: eventData.url,
//             // type:eventData.type,
//           organizerId: organizer.id, // Link event to the organizer
//         },
//       });
//     // Step 3: Assign the User as an OrganizerUser

//        await db.organizerUser.create({
//       data: {
//         organizerId: organizer.id,
//         userId: existingUser.id,
//         role: 'Owner', 
//       },
//     });
//     return { success: true, data: newEvent };


//     }
//     catch(error){
//       console.error('Unexpected error:', error)
//         return { success: false, message:"Error saving events",error:error};

//     }
// }

//  create event by an individual host
export const saveEvent=async(userId:string ,eventData:EventsType,totalTickets:number)=>{
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
              userId:existingUser.id
            },
          });

           // Step 2: Create the Event linked to the Organizer
    const newEvent = await db.event.create({
        data: {
          ...eventData,
         
          organizerId: organizer.id, // Link event to the organizer
        },
      });
   if(eventData.isFree===false){
    const newTicket=await db.ticketCategory.create({
      data:{
        name:"General",
        ticketPrice: parseFloat(eventData.price),
        totalStock:totalTickets,
        eventId:newEvent.id
      }

    })

   }
    return { success: true, data: newEvent };


    }
    catch(error){
      console.error('Unexpected error:', error)
        return { success: false, message:"Error saving events",error:error};

    }
}

export async function getAllEvents(){
  try{
    const events=await db.event.findMany({
      include:{
        Organizer:true,
        Category:true,
      }
    });
    return { success: true, data: events };

  }
  catch(error){
    handleError(error);
    return { success: false, message: "Error fetching data" };
  }
}

export async function getEventDetail(eventId:string){
  try{
    const event=await db.event.findUnique({
      where:{id:eventId},
      include:{
        Organizer:true,
        Category:true,
        TicketCategories:true,
      }
    })
    if (!event) {
      return { success: false, message: 'event with this id not found' }
    }
    return{success:true,data:event}
  }
  catch(error){
    handleError(error);
    return { success: false, message: "Error fetching data" };
  }
}
export async function getUserEvents(userId: string) {
  try {
    const organizers = await db.organizer.findMany({
      where: { userId },
      include: { 
        Event: {
          include: {
            Category: true,
          },
          orderBy: {
            startTime: 'desc', // Ensure sorting by startTime (newest first)
          },
        },
      },
    });

    if (!organizers || organizers.length === 0) {
      return { success: false, message: 'No events found for this user ID' };
    }

    const events = organizers.flatMap(org => org.Event);

    // Ensure sorting is maintained before returning
    const sortedEvents = events.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

    return { success: true, data: sortedEvents };
  } catch (error) {
    console.error('Unexpected error occurred:', error);
    return { success: false, message: 'An unexpected error occurred' };
  }
}

// export async function getUserEvents(userId: string) {
//   try {
//     // Find all organizers for the given user
//     const organizers = await db.organizer.findMany({
//       where: { userId },
//       select: { id: true }, // Only fetch organizer IDs
//     });

//     if (!organizers.length) {
//       return { success: false, message: 'No events found for this user ID' };
//     }

//     // Extract organizer IDs
//     const organizerIds = organizers.map(org => org.id);

//     // Fetch and sort events directly
//     const events = await db.event.findMany({
//       where: {
//         organizerId: { in: organizerIds },
//       },
//       include: {
//         Category: true,
//       },
//       orderBy: {
//         startTime: 'desc', // Newest events first
//       },
//     });

//     return { success: true, data: events };
//   } catch (error) {
//     console.error('Unexpected error occurred:', error);
//     return { success: false, message: 'An unexpected error occurred' };
//   }
// }



//update Terms and conditions
export async function updateToc(eventId: string, toc: string[]) {
  try {
    const updatedEvent = await db.event.update({
      where: { id: eventId },
      data: { toc },
    });

    return { success: true, data: updatedEvent };
  } catch (error) {
    console.error('Unexpected error occurred:', error);
    return { success: false, message: 'An unexpected error occurred' };
  }
}

//get individual event details
export async function getEventInfo(eventId:string){
  try{
    const event=await db.event.findUnique({
      where:{id:eventId},
       include:{
        Category:true,
      }
    })
    if (!event) {
      return { success: false, message: 'event with this id not found' }
    }
    return{success:true,data:event}
  }
  catch(error){
    handleError(error);
    return { success: false, message: "Error fetching data" };
  }
}

//upcoming or active events
export async function getUpcomingAndActiveEvents() {
  try {
    const currentTime = new Date();
    const events = await db.event.findMany({
      where: {
        OR: [
          { startTime: { gte: currentTime } }, // Events that haven't started yet
          {
            AND: [
              { startTime: { lte: currentTime } }, // Events that have started
              { endTime: { gte: currentTime } },   // But haven't ended yet
            ],
          },
        ],
      },
      include: {
        Organizer: true,
        Category: true,
      },
      orderBy: {
        startTime: 'asc', // Order by the earliest upcoming/ongoing event
      },
    });

    return { success: true, data: events };
  } catch (error) {
    handleError(error);
    return { success: false, message: "Error fetching upcoming and active events" };
  }
}
