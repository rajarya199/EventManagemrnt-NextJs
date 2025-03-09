import React from "react";
import { CheckCircle } from "lucide-react";

const FreeTicketCard = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Book Tickets</h2>
      <div className="flex flex-col items-center">
        <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
        <h3 className="text-lg font-medium text-gray-800">No Ticket Required</h3>
        <p className="text-gray-600">This event is completely free!</p>
      </div>
      <button className="mt-6 bg-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300">
        Enjoy the Event 🎉
      </button>
    </div>
  );
};

export default FreeTicketCard;
