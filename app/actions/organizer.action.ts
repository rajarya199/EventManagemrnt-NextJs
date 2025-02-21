"use server"
import db from '@/app/lib/db'

export async function getAllOraganization(){
    try{
        const organizer=await db.organizer.findMany({
            include:{
                User:true,
                Event:true,
                Organization:true
            }
        });
        return {success:true,data:organizer}
    }
    catch(error){
        console.error("Error while fetching organization:", error);
        return { success: false, message: "An unexpected error occurred" };

    }
}
