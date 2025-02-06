import { CategoryTable } from '@/src/components/category/CategoryTable'
import React from 'react'
import { Layout, Calendar, TrendingUp, Users } from "lucide-react";

import { StatsCard } from '@/src/components/usable/StatCard'
const CategoryPage = () => {
  return (
    <div className=''>
       <main className="p-6 ">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Event Categories
          </h1>
          {/* <p className="text-gray-500 mt-1">
            Manage your event categories and track their performance
          </p> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total Categories"
            value="24"
            icon={Layout}
            color="blue"
          />
          <StatsCard
            title="Most Popular"
            value="Music"
            icon={TrendingUp}
            color="green"
          />
          <StatsCard
            title="Total Events"
            value="1,234"
            icon={Calendar}
            color="purple"
          />
          {/* <StatsCard
            title="Active Users"
            value="45.2k"
            icon={Users}
            color="orange"
          /> */}
        </div>
    
      </main>
      <CategoryTable/>
    </div>
  )
}

export default CategoryPage