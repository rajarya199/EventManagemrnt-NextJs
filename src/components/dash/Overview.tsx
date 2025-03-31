"use client"
import React,{useState,useEffect} from "react";
import { Users, Calendar, Ticket,UserCheck2, DollarSign, List, UserCheck, Building } from "lucide-react";
import { getAllTotals } from "@/app/actions/info.action";
export const DashboardStats = () => {
  const [totals, setTotals] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllTotals();
        if (response.success && response.data) {
          setTotals(response.data);
        } else {
          console.error("Error fetching totals:", response.message);}
      } catch (err) {
        console.error("Error fetching totals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) return <p className="text-center text-gray-600">Loading statistics...</p>;

  const stats = [
    {
      label: "Total Events",
      value: totals.totalEvents,
      icon: Calendar,
      trend: "+12%",
      color: "bg-blue-500",
    },
    {
      label: "Total Attendees",
      value: totals.totalTicketSold,
      icon: Users,
      trend: "+18%",
      color: "bg-green-500",
    },
    {
      label: "Tickets Sold",
      value: totals.totalTicketSold,
      icon: Ticket,
      trend: "+24%",
      color: "bg-purple-500",

    },
    {
      label: "Revenue",
      value: `$${totals.bookingRevenue}`,
      icon: DollarSign,
      trend: "+32%",
      color: "bg-yellow-500",
    },
    {
      label: "Event Categories",
      value: totals.totalCategories,
      icon: List,
      trend: "+10%",
      color: "bg-orange-500",
    },
    {
      label: "Organizers",
      value: totals.totalOrganizers,
      icon: UserCheck,
      trend: "+15%",
      color: " bg-sky-500",
    },
    {
      label: "Organizations",
      value: totals.totalOrganizations,
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
