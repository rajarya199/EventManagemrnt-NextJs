"use server"
import db from '@/app/lib/db'
export async function getEventRegUsers(eventId:string){
    try{
        const registrations=await db.booking.findMany({
            where:{eventId},
            include:{
                User:{
                    select:{id:true,
                        fname:true,
                        lname:true,
                        email:true,
                    },
                },
                TicketOnBooking:{
                    include:{
                        TicketCategory:{
                            select:{name:true,ticketPrice:true}
                        },
                    },
                },
            },
            orderBy:{createdAt:"desc"}
        })
        if(!registrations || registrations.length===0){
            return{success:false,message:"No registration found for this event"}
        }
        return{success:true,data:registrations}
    }
    catch(error){
        console.error("error fetching the event registrations",error)
        return{success:false,message:"An unexpected error occured"}
    }
}

export async function getFreeEventRegUsers(eventId:string){
 try{
    const registrations =await db.freeEventRegistration.findMany({
        where:{eventId},
        include:{
            User:{
                select:{id:true,
                    fname:true,
                    lname:true,
                    email:true,
                },
            }
        },
        orderBy:{createdAt:"desc"}

    })
    if(!registrations || registrations.length===0){
        return{success:false,message:"No registration found for this event"}
    }
    return{success:true,data:registrations}
 }
 catch(error){
    console.error("error fetching the event registrations",error)
    return{success:false,message:"An unexpected error occured"}
 }
}

export async function getUserRegFreeEvent(userId:string){
    try{
        const registrations=await db.freeEventRegistration.findMany({
            where:{userId},
            include:{
                User:{
                    select:{id:true,
                        fname:true,
                        lname:true,
                        email:true,
                    },
                },
                Event:true,
            },
            orderBy:{createdAt:"desc"}
        })
        if(!registrations || registrations.length===0){
            return{success:false,message:"No event has been registered by you"}
        }
        return{success:true,data:registrations}

    }
    catch(error){
        console.error("error fetching the event registrations",error)
        return{success:false,message:"An unexpected error occured"}
    }
}