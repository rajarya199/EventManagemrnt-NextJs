import React from 'react'
import { Search, Plus, Filter } from "lucide-react";
const page = () => {
  return (
    <div className='bg-primary-50 min-h-screen'>
      <div className='wrapper'>
      <div className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl font-poppins font-semibold text-gray-900">Events</h1>
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm">
                    <Plus size={20} />
                    Add Tickets
                  </button>
      </div>
      </div>
   
    </div>
  )
}

export default page