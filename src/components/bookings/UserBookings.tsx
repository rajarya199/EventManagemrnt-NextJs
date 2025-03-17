"use client"
import React,{useState,useEffect} from 'react'
import { getUserBookings } from '@/app/actions/userBooking.action'
import BookingCard from './BookingCard'
interface bookingProps{
  userId:string
}
const UserBookings = ({userId}:bookingProps) => {
  const [bookings,setBookings]=useState<any[]>([])
   useEffect(() => {
                  const fetchData = async () => {
                    try {
                      const response = await getUserBookings(userId);
                      if (response.success && response.data) {
                        setBookings(response.data);
                      } else {
                        console.error("Failed to fetch booking data");
                      }
                    } catch (error) {
                      console.error("Failed to fetch booking datas");
                    }
                  };
                  fetchData();
                }, [])
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {bookings.map((booking) => (
    <BookingCard key={booking.id} booking={booking} />
  ))}
</div>
    </div>
  )
}

export default UserBookings