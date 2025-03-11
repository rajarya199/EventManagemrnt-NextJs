"use client";
import React, { useState, useEffect } from "react";
import { Check ,CircleCheckBigIcon} from "lucide-react";
import { getEventTicketCategories } from "@/app/actions/ticket.action";

interface TicketProps {
  eventId: string;
  scrollToBooking: () => void;
}

export const EventTicketCard = ({ eventId, scrollToBooking }: TicketProps) => {
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
    <div>
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Event Tickets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => {
            const soldTickets = ticket.Tickets.length; // Count of sold tickets
            const availableTickets = ticket.totalStock - soldTickets;
            const availabilityPercentage =
              (availableTickets / ticket.totalStock) * 100;

            return (
              <div
              key={ticket.id}
              className="bg-[#E9ECF5] p-6 rounded-xl border hover:shadow-lg transition-shadow hover:bg-[#F3F5FC]"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{ticket.name}</h3>
                  <p className="text-3xl font-bold">${ticket.ticketPrice}</p>
                </div>
                <div className="space-y-3 p-2">
                  {ticket.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <CircleCheckBigIcon size={18} className="text-green-500 mt-1" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Available Tickets</span>
                    <span>
                      {availableTickets} / {ticket.totalStock}
                    </span>
                  </div>
                  <div className="w-full bg-[#D6DAE5] rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-width duration-300"
                      style={{ width: `${availabilityPercentage}%` }}
                    />
                  </div>
                </div>
                <button
                  onClick={scrollToBooking}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Select Ticket
                </button>
              </div>
            </div>
            
            );
          })}
        </div>
      </section>
    </div>
  );
};