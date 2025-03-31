"use server"
import db from '@/app/lib/db'

export const getAllTotals=async()=>{
    try{
        const totalUsers=await db.user.count()
        const totalEvents=await db.event.count()
        const totalCategories=await db.category.count()
        const totalOrganizers=await db.organizer.count()
        const totalTicketSold=await db.ticket.count()
        const totalBookings=await db.booking.count()
        const totalOrganizations=await db.organization.count()
        const bookingRevenue=await db.booking.aggregate({
            _sum:{totalAmount:true}
        })
        return {success:true,data:{
            totalUsers,
            totalEvents,
            totalCategories,
            totalOrganizers,
            totalTicketSold,
            totalBookings,
            totalOrganizations,
            bookingRevenue:bookingRevenue._sum.totalAmount || 0,

        }}
    }catch(error){
        console.error("Error fetching the totals",error)
        return {success:false,message:"An unexpected error occured"}
    }
}

export const getCatEventInfo=async()=>{
    try{
        const categoryData=await db.category.findMany({
            include:{
                Event:true,
            }
        })

        const formattedData=categoryData.map((category)=>({
            name:category.name,
            value:category.Event.length,
        }))
        return {success:true,data:formattedData}

    }
    catch(error){
        console.error("Error fetching the event and category info",error)
        return {success:false,message:"An unexpected error occured"}
    }
}