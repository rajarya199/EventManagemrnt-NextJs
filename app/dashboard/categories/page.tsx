"use client"
import { CategoryTable } from '@/src/components/category/CategoryTable'
import React,{useState,useEffect} from 'react'
import { Layout, Calendar, TrendingUp, Users } from "lucide-react";

import { StatsCard } from '@/src/components/usable/StatCard'
import { getAllCategory } from '@/app/actions/category.action';
const CategoryPage = () => {
    const [category, setCategory] = useState<any[]>([]);
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await getAllCategory();
          if (response.success && response.data) {
            setCategory(response.data);
          } else {
            console.error("Failed to fetch categories");
          }
        } catch (error) {
          console.error("Failed to fetch categories");
        }
      };
      fetchCategories();
    }, []);
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
            value={category.length}
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
            value="12"
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