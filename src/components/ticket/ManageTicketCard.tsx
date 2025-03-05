import React from 'react'
import Link from 'next/link';
import { Ticket, Users, Crown, Award,Settings } from "lucide-react";
interface TicketProps{
  eventId:string
}
interface TicketCategory {
  category: string;
  sold: number;
  total: number;
  status: "Available" | "Limited" | "Sold Out";
  price: number;
}
const ticketData: TicketCategory[] = [
  {
    category: "General",
    sold: 150,
    total: 200,
    status: "Available",
    price: 50,
  },
  {
    category: "VIP Pass",
    sold: 95,
    total: 100,
    status: "Limited",
    price: 150,
  },
  {
    category: "Gold Pass",
    sold: 50,
    total: 50,
    status: "Sold Out",
    price: 250,
  },
];
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
const TicketCategoryRow = ({
  category,
  sold,
  total,
  status,
  price,
}: TicketCategory) => {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center space-x-3">
        {getCategoryIcon(category)}
        <div>
          <h3 className="font-medium text-gray-900">{category}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            {sold} / {total} sold
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-semibold text-gray-900">Rs. {price}</div>
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
  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-gray-200">
    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-900">
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
      {ticketData.map((ticket, index) => (
        <TicketCategoryRow key={index} {...ticket} />
      ))}
    </div>
  </div>
  )
}

export default ManageTicketCard