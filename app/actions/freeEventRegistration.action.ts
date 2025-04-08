"use server"
import db from '@/app/lib/db'

export const saveRegistration=async({userId,eventId}:{userId:string,eventId:string})=>{
    try{
        const existingRegistration=await db.freeEventRegistration.findFirst({
            where:{
                userId,
                eventId,
            },
        })
        if(existingRegistration){
            return{success:false,message:"You have already registered for this event"}
        }
        const newRegistration=await db.freeEventRegistration.create({
            data:{
                userId,
                eventId,
                status:"CONFIRMED"

            },
        })
        return{success:true,data:newRegistration}
    }
    catch(error){
        console.error("Error saving registration",error)
        return{success:false,message:"An unexpected error occurred"}
    }
}