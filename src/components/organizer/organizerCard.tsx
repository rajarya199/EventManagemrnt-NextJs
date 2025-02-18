import React from "react";

import { Eye, Edit2, Trash2 } from "lucide-react";
const Organizer= {
  organizationName: "Radhe Shyam Group",
  organizerName: "hari",
  coOrganizerName:"Sita" ,
  eventCount: 20

}
export const OrganizerCard = () => {
  return (
    //className="w-full max-w-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400
    <div className="w-full max-w-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ">
      <div className="p-1">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {Organizer.organizationName}
              </h3>
              <div className="mt-3 space-y-2">
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-purple-600">By:</span>{" "}
                  <span className="text-pink-600">{Organizer.organizerName}</span>
                  {Organizer.coOrganizerName && (
                    <>
                      <span className="text-gray-400"> • </span>
                      <span className="text-pink-600">{Organizer.coOrganizerName}</span>
                    </>
                  )}
                </p>
                <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100">
                  <p className="text-sm font-medium text-purple-600">
                    {Organizer.eventCount} events
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
            
                className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-600 hover:text-purple-700 transition-colors"
                aria-label="View details"
              >
                <Eye size={18} />
              </button>
              <button
                
                className="p-2 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-600 hover:text-pink-700 transition-colors"
                aria-label="Update details"
              >
                <Edit2 size={18} />
              </button>
              <button
            
                className="p-2 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-600 hover:text-orange-700 transition-colors"
                aria-label="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
