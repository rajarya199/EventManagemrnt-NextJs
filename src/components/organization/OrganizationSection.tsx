"use client"
import React,{useState,useEffect} from 'react'
import Link from 'next/link';
import { MoreHorizontal, Search, Filter } from "lucide-react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { organizationFormSchema } from '@/src/lib/schema';
import { getAllOrganizations } from '@/app/actions/organization.action';
import { OrganizationCard } from './OrganizationCard';
const OrganizationSection = () => {
  const[orgData,setOrgData]=useState<any[]>([])
     useEffect(() => {
       async function fetchData() {
         try{
             const result=await getAllOrganizations();
             if(result.success && result.data){
              setOrgData(result.data)
             } 
         }
         catch(error){
          console.error("failed to fetch user data")
         }
       }
         fetchData();
     }, []);
  return (
    <div>
         <div className="p-4 border-b border-gray-100 dark:border-gray-600 flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search Organization..."
              className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
         <button className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <Filter className="w-4 h-4 mr-2" />
                                    Filter
                                  </button>
        </div>
        <Link href='/dashboard/organizations/add'>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Organization
        </button>
        </Link>
     
     
      </div>

      <div>
        <OrganizationCard organizations={orgData}/>
      </div>
    </div>
  )
}

export default OrganizationSection

