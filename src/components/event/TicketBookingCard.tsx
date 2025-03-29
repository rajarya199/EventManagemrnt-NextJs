import React, { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
interface TicketType {
  name: string;
  price: number;
  features: string[];
  isFeatured: boolean;
}
interface TicketQuantity {
  [key: string]: number;
}

interface TicketBookingProps{
  tickets:any[],eventId:string
}
export const TicketBookingCard = ({ tickets ,eventId}: TicketBookingProps) => {
  const [quantities, setQuantities] = useState<TicketQuantity>(
    tickets.reduce(
      (acc, ticket) => ({
        ...acc,
        [ticket.name]: 0,
      }),
      {},
    ),
  );
  const updateQuantity = (ticketName: string, delta: number,availableTickets:number) => {
    const currentQuantity = quantities[ticketName] || 0;
    const newQuantity = currentQuantity + delta;

    if (newQuantity <= availableTickets && newQuantity >= 0) {
      setQuantities((prev) => ({
        ...prev,
        [ticketName]: newQuantity,
      }));
    }
  };
  const totalAmount = tickets.reduce(
    (sum, ticket) => sum + (ticket.ticketPrice * (quantities[ticket.name] || 0)),
    0,
  );
  const totalTickets = Object.values(quantities).reduce((sum, q) => sum + q, 0);
  const handleCheckout = async () => {
    if (totalTickets === 0) return;
  
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId,
        tickets: tickets
          .filter(ticket => quantities[ticket.name] > 0)
          .map(ticket => ({
            name: ticket.name,
            ticketPrice: ticket.ticketPrice,
            quantity: quantities[ticket.name],
            ticketCategoryId: ticket.id, 

          })),
      }),
    });
  
    const data = await response.json();
    if (data.url) {
      window.location.href = data.url; // Redirect to Stripe Checkout
    } else {
      alert("Error processing payment");
    }
  };
  

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Book Tickets</h2>
      <div className="space-y-4">
        {tickets.map((ticket) =>{
             const soldTickets = ticket.Tickets.length;
             const availableTickets = ticket.totalStock - soldTickets; 
             const status = availableTickets > 0 ? "Available" : "Sold Out";
       return  (
        
          <div key={ticket.name} className="flex flex-col py-2 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{ticket.name}</h3>
                <p className="text-sm text-gray-600">
                  ${ticket.ticketPrice.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(ticket.name, -1,availableTickets)}
                  className="p-1 rounded-full hover:bg-gray-100"
                  disabled={quantities[ticket.name] === 0}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">
                  {quantities[ticket.name]}
                </span>
                <button
                  onClick={() => updateQuantity(ticket.name, 1,availableTickets)}
                  className="p-1 rounded-full hover:bg-gray-100"
                  disabled={quantities[ticket.name] >= availableTickets}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            {quantities[ticket.name] > 0 && (
              <div className="text-right text-sm text-gray-500 mt-1">
                {quantities[ticket.name]} × ${ticket.ticketPrice.toFixed(2)} = $
                {(quantities[ticket.name] * ticket.ticketPrice).toFixed(2)}
              </div>
            )}
               <div className="text-right text-xs mt-1 text-gray-500">
                {availableTickets} tickets available
              </div>
              {/* <div
                className={`mt-1 px-1 py-0.5 text-xs font-medium rounded-full border inline-block ${
                  status === "Available"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                {status}
              </div> */}
          </div>
        )
      }
        )}
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-sm">
          <span>Total tickets:</span>
          <span>{totalTickets}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Total amount:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <button
        onClick={handleCheckout}
          className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 ${totalTickets > 0 ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
          disabled={totalTickets === 0}
        >
          <ShoppingCart className="w-5 h-5" />
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};
