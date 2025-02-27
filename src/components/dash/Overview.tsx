import React from "react";
import { Users, Calendar, Ticket,UserCheck2, DollarSign, List, UserCheck, Building } from "lucide-react";

export const DashboardStats = () => {
  const stats = [
    {
      label: "Total Events",
      value: "10",
      icon: Calendar,
      trend: "+12%",
      color: "bg-blue-500",
    },
    {
      label: "Total Attendees",
      value: "1,234",
      icon: Users,
      trend: "+18%",
      color: "bg-green-500",
    },
    {
      label: "Tickets Sold",
      value: "200",
      icon: Ticket,
      trend: "+24%",
      color: "bg-purple-500",

    },
    {
      label: "Revenue",
      value: "$12,345",
      icon: DollarSign,
      trend: "+32%",
      color: "bg-yellow-500",
    },
    {
      label: "Event Categories",
      value: "12",
      icon: List,
      trend: "+10%",
      color: "bg-orange-500",
    },
    {
      label: "Organizers",
      value: "56",
      icon: UserCheck,
      trend: "+15%",
      color: " bg-sky-500",
    },
    {
      label: "Organizations",
      value: "34",
      icon: Building,
      trend: "+20%",
      color: " bg-red-500",
    },
  ];

  return (
    <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className=" text-gray-800">{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              {/* <span className="text-sm text-green-500">{stat.trend}</span> */}
            </div>
            <div className={`p-3 rounded-full ${stat.color} text-white`}>
              <stat.icon size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
