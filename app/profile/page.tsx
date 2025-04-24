"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs'
import {
 
  MapPin,
  Mail,
  Phone,
  Edit,
  Plus,
} from "lucide-react";
import StatCard from '@/src/components/userDash/StatCard';
const page = () => {
  const { user,isLoaded,isSignedIn } = useUser();
  console.log(user)
  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Please sign in to view your profile.</div>;
  const userId = user?.publicMetadata.userId as string;

  return (
    <div className='wrapper dark:bg-primary-900'>
             {/* {user?.fullName}

       {user?.firstName}
        {user?.lastName}
        {user?.emailAddresses[0].emailAddress} */}
        <div className=" mx-2 my-4 bg-white dark:bg-primary-600 p-6 rounded-lg shadow">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="relative">
                  <img
                    src={user?.imageUrl}
                    alt={user?.fullName ||""}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full">
                    <Edit size={16} />
                  </button>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h1 className="text-2xl font-bold">{user?.fullName}</h1>
                    <button className="text-blue-600 flex items-center">
                      <Edit size={16} className="mr-1" /> Edit Profile
                    </button>
                  </div>
                  <div className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                      <Mail size={16} className="mr-2" />
                      <span> {user?.emailAddresses[0].emailAddress}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone size={16} className="mr-2" />
                      <span>{user?.phoneNumbers[0]?.phoneNumber}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2" />
                      <span>Butwal</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="mt-6 border-t pt-4">
                <h2 className="text-lg font-semibold mb-2">About</h2>
                <p className="text-gray-600">{user.bio}</p>
              </div> */}
            </div>
            <div>
            <StatCard userId={userId}/>
            </div>
           
    </div>
  )
}

export default page