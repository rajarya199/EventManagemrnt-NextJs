// import React from 'react'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/src/components/ui/table";

// interface BookingProps{
//   bookings:any[]
// }
// const BookingTable = ({bookings}:BookingProps) => {
//   return (
//     <div>
//       <Table className="w-full border-collapse border shadow rounded">
//          <TableHeader>
//                   <TableRow>
//                     <TableHead>S.N</TableHead>
//                     <TableHead>Event</TableHead>
//                     <TableHead>Booked By</TableHead>
//                     <TableHead>Booking Date</TableHead>
//                     <TableHead>Ticket Type</TableHead>
//                     <TableHead>Quantity</TableHead>
//                     <TableHead>Total Amount</TableHead>
//                     <TableHead>Status</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {bookings.length > 0 ? (
//                     bookings.map((booking, index) => (
//                       <TableRow key={booking.id}>
//                         <TableCell>{index + 1}</TableCell>
//                         <TableCell>{booking.Event.title}</TableCell>
//                         <TableCell>{booking.User.fname} {booking.User.lname}</TableCell>
//                         <TableCell>{new Date(booking.createdAt).toLocaleDateString()}</TableCell>
//                         <TableCell>
//   {booking.TicketOnBooking.map((ticketOnBooking:any) => (
//     <div key={ticketOnBooking.id}>
//       {ticketOnBooking.TicketCategory.name} (Qty: {ticketOnBooking.quantity})
//     </div>
//   ))}
// </TableCell>
//                         <TableCell>{booking.totalAmount}</TableCell>
//                         <TableCell>{booking.status}</TableCell>
//                       </TableRow>
//                     ))
//                     ):(
//                       <TableRow>
//                         <TableCell colSpan={5} className="text-center text-gray-500">
//                           No Booking found.
//                         </TableCell>
//                       </TableRow>
//                     )}
//                 </TableBody>
//         </Table>
//     </div>

//   )
// }

// export default BookingTable

import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"

interface BookingProps {
  bookings: any[]
}

const BookingTable = ({ bookings }: BookingProps) => {
  return (
    <div className='dark:bg-primary-600' >
      <Table className=" w-full border border-collapse shadow rounded">
        <TableHeader>
          <TableRow>
            <TableHead>S.N</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Booked By</TableHead>
            <TableHead>Booking Date</TableHead>
            <TableHead>Ticket Type</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length > 0 ? (
            bookings.map((booking, index) =>
              booking.TicketOnBooking.map((ticket: any, i: number) => (
                <TableRow key={`${booking.id}-${ticket.id}`} >
                  {i === 0 && (
                    <>
                      <TableCell 
                         
                        rowSpan={booking.TicketOnBooking.length}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell 
                        rowSpan={booking.TicketOnBooking.length}
                      >
                        {booking.Event.title}
                      </TableCell>
                      <TableCell 
                        rowSpan={booking.TicketOnBooking.length}
                      >
                        {booking.User.fname} {booking.User.lname}
                      </TableCell>
                      <TableCell 
                        rowSpan={booking.TicketOnBooking.length}
                      >
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </TableCell>
                    </>
                  )}
                  <TableCell>
                    {ticket.TicketCategory.name}
                  </TableCell>
                  <TableCell className="text-center">
                    {ticket.quantity}
                  </TableCell>
                  <TableCell>
                    
                  {ticket.totalPrice}

                  </TableCell>
                  {i === 0 && (
                    <>
                      <TableCell 
                        rowSpan={booking.TicketOnBooking.length}
                      >
                        {booking.totalAmount}
                      </TableCell>
                      <TableCell 
                        rowSpan={booking.TicketOnBooking.length}
                      >
                        {booking.status}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            )
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-gray-500 py-4">
                No bookings found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default BookingTable
