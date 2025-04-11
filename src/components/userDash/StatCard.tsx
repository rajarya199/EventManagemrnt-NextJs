"use client";
import React, { useState, useEffect } from "react";
import { Calendar, Ticket, DollarSign, UserCheck,TicketCheck ,ClipboardCheck} from "lucide-react"; // Make sure to import the necessary icons
import { getUserStats } from "@/app/actions/info.action";
interface CardParam {
  userId: string;
}

const StatCard = ({ userId }: CardParam) => {
  const [totals, setTotals] = useState<any>(null); 
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await getUserStats(userId)
        

        if (response.success && response.data) {
          setTotals(response.data); 
        } else {
          console.error("Failed to fetch stats:", response.message);
        }
      } catch (error) {
        console.error("Error fetching user stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!totals) {
    return <div>No data available</div>;
  }

  const stats = [
    {
      label: "My Events",
      value: totals.totalEventsCreated,
      icon: Calendar,
      color: "bg-blue-500",
      info: "Total events you have created",
    },
    {
      label: "Tickets Sold",
      value: totals.totalTicketsSold,
      icon: Ticket,
      color: "bg-green-500",
      info: "Total tickets sold for your events",
    },
    {
      label: "Revenue",
      value: `$${totals.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-yellow-500",
      info: "Total revenue from bookings",
    },
    {
      label: "My Bookings",
      value: totals.totalEventsBooked,
      icon: UserCheck,
      color: "bg-purple-500",
      info: "Total events you've booked",
    },
    {
      label: "Registered Events",
      value: totals.totalRegisteredEvents ,
      icon: ClipboardCheck,
      color: "bg-orange-500",
      info: "Total Free events you've registerd",
    },
    {
        label: "Tickets Bought",
        value: totals.totalTicketsBooked,
        icon: TicketCheck,
        color: "bg-green-500",
        info: "Total tickets bought",
      },
  ];

  return (
    <div>
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl border  border-gray-200 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className=" text-gray-800">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                {/* Optional info text */}
                <span className="text-sm text-gray-500">{stat.info}</span>
              </div>
              <div className={`p-3 rounded-full ${stat.color} text-white`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatCard;
