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





export const getUserStats = async (userId: string) => {
    try {
        // Find all the organizer IDs linked to this user across all events they have organized
        const organizers = await db.organizer.findMany({
            where: { userId },
            select: { id: true }
        });
 // Count total free events the user has registered for
 const totalRegisteredEvents = await db.freeEventRegistration.count({
    where: { userId }
});
        if (!organizers || organizers.length === 0) {
            return {
                success: true,
                data: {
                    totalEventsCreated: 0,
                    totalTicketsSold: 0,
                    totalRevenue: 0,
                    totalEventsBooked: await db.booking.count({ where: { userId } }),
                    totalTicketsBooked: await db.ticket.count({ where: { bookedById: userId } }),
                    totalRegisteredEvents

                }
            };
        }

        const organizerIds = organizers.map(organizer => organizer.id);

        const [
            totalEventsCreated,
            totalTicketsSold,
            totalRevenue,
            totalEventsBooked,
            totalTicketsBooked
        ] = await Promise.all([
            // Count total events organized by the user (across multiple organizer IDs)
            db.event.count({
                where: { organizerId: { in: organizerIds } }
            }),

            // Count total tickets sold for events the user organized (across multiple organizer IDs)
            db.ticket.count({
                where: { TicketCategory: { Event: { organizerId: { in: organizerIds } } } }
            }),

            // Sum total revenue for events the user organized (across multiple organizer IDs)
            db.booking.aggregate({
                _sum: { totalAmount: true },
                where: { Event: { organizerId: { in: organizerIds } } }
            }),

            // Count total events booked by the user
            db.booking.count({
                where: { userId }
            }),

            // Count total tickets booked by the user
            db.ticket.count({
                where: { bookedById: userId }
            })
        ]);

        return {
            success: true,
            data: {
                totalEventsCreated,
                totalTicketsSold,
                totalRevenue: totalRevenue._sum.totalAmount || 0, // Ensure fallback to 0 if no revenue
                totalEventsBooked,
                totalTicketsBooked,
                totalRegisteredEvents

            }
        };
    } catch (error) {
        console.error("Error fetching user stats:", error);
        return { success: false, message: "An unexpected error occurred" };
    }
};

