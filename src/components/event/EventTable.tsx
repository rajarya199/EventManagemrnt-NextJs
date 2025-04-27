"use client"
import React,{useState,useEffect} from "react";
import { MoreHorizontal, Search, Filter } from "lucide-react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"
import { getAllEvents } from "@/app/actions/event.action";
import { newDate } from "react-datepicker/dist/date_utils";
 
const EventTable = ({ searchQuery }: { searchQuery: string }) => {
    const [events,setEvents]=useState <any[]>([])
    useEffect(() => {
        const fetchEvents = async () => {
          try {
            const response = await getAllEvents();
            if (response.success && response.data) {
              setEvents(response.data);
            } else {
              console.error("Failed to fetch events");
            }
          } catch (error) {
            console.error("Failed to fetch events");
          }
        };
        fetchEvents();
      }, []);
      const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.Category.name.toLowerCase().includes(searchQuery.toLowerCase())

      );
  return (
    <div className="dark:bg-primary-600">
      <div className="overflow-x-auto">
      <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              {/* <TableHead>Description</TableHead> */}
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Price</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <TableRow key={event.id} className="">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div className="relative h-12 w-12">
                      <Image
                        src={event.imageUrl[0]}
                        alt={event.title}
                        className="object-cover rounded-sm"
                        fill
                      />
                    </div>
                  </TableCell>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event.Category?.name}</TableCell>
                  <TableCell>{event.type}</TableCell>
                  <TableCell>
                    {new Date(event.startTime).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(event.endTime).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{event.price}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex space-x-2">
                      <Link href={`/`}>
                        <button
                          className="text-blue-500 hover:text-green-700 text-2xl"
                          aria-label="Edit"
                        >
                          <FaEdit />
                        </button>
                      </Link>
                      <button className="text-gray-400 dark:text-gray-300 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-gray-500">
                  No events found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default EventTable