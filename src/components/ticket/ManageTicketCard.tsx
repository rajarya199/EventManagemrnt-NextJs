"use client"
import React,{useState,useEffect} from 'react'
import Link from 'next/link';
import { getEventTicketCategories } from "@/app/actions/ticket.action";

import { Ticket, Users, Crown, Award,Settings, } from "lucide-react";
interface TicketProps{
  eventId:string
}


const getStatusStyle = (status: string) => {
  switch (status) {
    case "Available":
      return "bg-green-50 text-green-700 border-green-200";
    case "Limited":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "Sold Out":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "General":
      return <Ticket className="w-5 h-5 text-blue-500" />;
    case "VIP Pass":
      return <Crown className="w-5 h-5 text-purple-500" />;
    case "Gold Pass":
      return <Award className="w-5 h-5 text-yellow-500" />;
    default:
      return <Ticket className="w-5 h-5 text-gray-500" />;
  }
};

interface TicketCategoryRowProps {
  ticket:any
}

const TicketCategoryRow = ({
ticket
}: TicketCategoryRowProps) => {
  const soldTickets = ticket.Tickets.length;
  const availableTickets = ticket.totalStock - soldTickets;
  const status = availableTickets > 0 ? "Available" : "Sold Out";
  return (
    <div className="flex items-center justify-between p-4 roundex-xl hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 last:border-b-0">
      <div className="flex items-center space-x-3">
      <Ticket className="w-5 h-5 text-blue-500" />
        <div>
          <h3 className="font-medium dark:text-gray-100 text-gray-900">{ticket.name}</h3>
          <div className="flex items-center text-sm dark:text-gray-300 text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            {soldTickets} / {ticket.totalStock} sold
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-semibold dark:text-gray-100 text-gray-900">Rs.{ticket.ticketPrice}</div>
        <div
          className={`mt-1 px-1 py-0.5 text-xs font-medium rounded-full border inline-block ${getStatusStyle(status)}`}
        >
          {status}
        </div>
      </div>
    </div>
  );
};
const ManageTicketCard = ({eventId}:TicketProps) => {
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
      useEffect(() => {
        async function fetchData() {
          setLoading(true);
          try {
            const response = await getEventTicketCategories(eventId);
            if (response.success && response.data) {
              setTickets(response.data);
            } else {
              console.error("Failed to fetch data");
            }
          } catch (error) {
            console.error("Failed to fetch data", error);
          } finally {
            setLoading(false);
          }
        }
        fetchData();
      }, [eventId]);
      if (loading) {
        return (
          <div className="flex justify-center items-center my-20 h-full">
            Loading...
          </div>
        );
      }
  return (
    <div className="w-full max-w-2xl bg-white dark:bg-primary-600 rounded-xl shadow-sm border border-gray-200">
    <div className="p-6 border-b border-gray-200 dark:border-gray-500 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Tickets
      </h2>
      <Link
        href={`/profile/my-events/ticket/${eventId}`}
        className="inline-flex items-center px-4 py-2 bg-blue-500 text-sm font-medium rounded-lg text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm"
      >
        <Settings className="w-4 h-4 mr-2" />
        Manage
      </Link>
    </div>
    <div className="divide-y divide-gray-200">
      {tickets.map((ticket, index) => (
        <TicketCategoryRow key={index} ticket={ticket} />
      ))}
    </div>
  </div>
  )
}

export default ManageTicketCard