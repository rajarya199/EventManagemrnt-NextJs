"use server"
import db from '@/app/lib/db'
import { handleError } from '../lib/utiils'

export async function getPastEvents() {
    try {
      const pastEvents = await db.event.findMany({
        where: {
          endTime: {
            //end time less than current time
            lt: new Date(), 
          },
        },
        include: {
          Organizer: true,
          Category: true,
        },
      });
  
      return { success: true, data: pastEvents };
    } catch (error) {
      handleError(error);
      return { success: false, message: "Error fetching past events" };
    }
  }
  